import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, Post, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from './restaurant/restaurant.module';
import * as Joi from 'joi';
import { Restaurant } from './restaurant/entity/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entity/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JWTMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { Verification } from './users/entity/verification.entity';


@Module({
  imports: [
    // RestaurantModule,
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV ==='prod',
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.valid('dev', 'prod', 'debug').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        TOKEN_SECRET: Joi.string().required(),
      })
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true, // генерировать на лету
      context: ({req}) => ({ user: req["user"] })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCALHOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Verification],      // добавить Entity
      synchronize: true,   // будет делать миграции само
    }),
    UsersModule,
    JwtModule.forRoot({
      privateKey: process.env.TOKEN_SECRET,
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTMiddleware)
            .forRoutes({             // применять только к путям
              path: '/graphql',      // начинающимся на /graphql
              method: RequestMethod.ALL     // и только на метод
            })
  }
}
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver } from './restaurant/restaurant-resolver';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    RestaurantModule,
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV ==='prod',
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true, // генерировать на лету
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCALHOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [RestaurantResolver],
})
export class AppModule {}

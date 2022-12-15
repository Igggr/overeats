import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver } from './restaurant/restaurant-resolver';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    RestaurantModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true, // генерировать на лету
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123456',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [RestaurantResolver],
})
export class AppModule {}

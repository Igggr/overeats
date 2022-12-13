import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantResolver } from './restaurant/restaurant-resolver';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    RestaurantModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true, // генерировать на лету
    })
  ],
  controllers: [],
  providers: [RestaurantResolver],
})
export class AppModule {}

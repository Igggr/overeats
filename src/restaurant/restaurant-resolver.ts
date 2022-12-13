import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Restaurant, CreateRestaurant } from "./restauranrt.dto";

@Resolver(of => Restaurant)
export class RestaurantResolver {

    @Query(returns => Boolean)
    isRestaurantExist(): boolean {
        return false;
    } 

    @Mutation(returns => Boolean)
    createRestaurant(
        @Args('createDto') createDto: CreateRestaurant
    ): boolean {
        console.log(createDto.name, createDto.rating)
        return true;
    }
}
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateRestaurant, ReviewArgs } from "./restauranrt.dto";
import { Restaurant } from "./entity/restaurant.entity";
import { RestaurantService } from "./services/restaurant.service";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService) {}

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

    @Mutation(returns => Boolean)
    rateReataurant(
        @Args() review: ReviewArgs
    ) {
        return true;
    }

}
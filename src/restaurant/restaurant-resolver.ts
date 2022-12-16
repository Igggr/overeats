import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateRestaurant, ReviewArgs } from "./restauranrt.dto";
import { Restaurant } from "./entity/restaurant.entity";
import { RestaurantService } from "./services/restaurant.service";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Query(returns => [Restaurant])
    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.restaurantService.findAll();
    }

    @Query(returns => [Restaurant])
    async getRestuarnatWithFoodStyle(@Args('style') style: string): Promise<Restaurant[]> {
        return this.restaurantService.findByStyle(style)
    } 

    @Mutation(returns => Boolean)
    async createRestaurant(
        @Args('createDto') createDto: CreateRestaurant
    ): Promise<boolean> {
        await this.restaurantService.createReastaurant(createDto);
        return true;
    }  
}
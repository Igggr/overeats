import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateRestaurant } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDTO } from "./dto/update-restaurant.dto";
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

    @Mutation(returns => Restaurant)
    async createRestaurant(
        @Args('createDto') createDto: CreateRestaurant
    ): Promise<Restaurant> {
        return await this.restaurantService.createReastaurant(createDto);
    }  

    @Mutation(returns => Boolean)
    async updateRestaurant(@Args('updateDTO') updateDTO: UpdateRestaurantDTO) {
        this.restaurantService.updateRestaurant(updateDTO)
        return true;
    }
}
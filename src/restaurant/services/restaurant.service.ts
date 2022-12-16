import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entity/restaurant.entity';
import { CreateRestaurant } from '../restauranrt.dto';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurants : Repository<Restaurant>,
    ) {}

    findAll(): Promise<Restaurant[]> {
        return this.restaurants.find();
    }

    createReastaurant(createDto: CreateRestaurant): Promise<Restaurant> {
        const restaurant =  this.restaurants.create(createDto);
        return this.restaurants.save(restaurant);
    }

    findByStyle(style: string) {
        return this.restaurants.findBy({style});
    }
}

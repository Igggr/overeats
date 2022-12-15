import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entity/restaurant.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant) restaurants : Repository<Restaurant>,
    ) {}
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantResolver } from './restaurant-resolver';
import { RestaurantService } from './services/restaurant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant])  // Repository<Restaurant>
  ],
  providers: [RestaurantService, RestaurantResolver]  // чтобы использовать в Resolver
})
export class RestaurantModule {}

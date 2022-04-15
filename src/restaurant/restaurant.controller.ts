import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetRestaurantsQueryDto } from './models/get-restaurants-query.dto';
import { RestaurantApiObject } from './models/restaurants-api-response.interface';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
@UseGuards(AuthGuard())
export class RestaurantController {
    constructor(private restaurantService: RestaurantService) {}

    @Get()
    getRestaurants(
        @GetUser() user: User,
        @Query() queryDto: GetRestaurantsQueryDto,
    ): Promise<RestaurantApiObject[]> {
        return this.restaurantService.getRestaurants(user, queryDto);
    }
}

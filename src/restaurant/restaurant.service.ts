import { Injectable, Logger } from '@nestjs/common';
import { GetRestaurantsQueryDto } from './models/get-restaurants-query.dto';
import axios from 'axios';
import {
    RestaurantApiObject,
    RestaurantsApiResponse,
} from './models/restaurants-api-response.interface';
import { config } from 'src/config/config';
import { TransactionName } from 'src/transaction/models/create-transaction.dto';
import { User } from 'src/auth/user.entity';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class RestaurantService {
    constructor(private transactionService: TransactionService) {}

    async getRestaurants(
        user: User,
        queryDto: GetRestaurantsQueryDto,
    ): Promise<RestaurantApiObject[]> {
        // Call API to retrieve restaurants near position (lat, lon)
        const response = await axios.get(config.apiRestaurantsUrl, {
            params: {
                lat: queryDto.lat,
                lon: queryDto.lon,
                radius: '10000',
                view: 'Unified',
                relatedPois: 'off',
                key: config.apiRestaurantsKey,
                categorySet: '7315',
            },
        });

        const data = response.data as RestaurantsApiResponse;

        // Try to save GET_RESTAURANTS transaction on database
        try {
            await this.transactionService.createTransaction({
                name: TransactionName.GET_RESTAURANTS,
                user: user,
            });
        } catch (_) {
            Logger.error(
                `Error saving transaction ${TransactionName.GET_RESTAURANTS}`,
            );
        }

        return data.results;
    }
}

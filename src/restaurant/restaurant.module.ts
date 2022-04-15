import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
    imports: [AuthModule, TransactionModule],
    providers: [RestaurantService],
    controllers: [RestaurantController],
})
export class RestaurantModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [AuthModule, RestaurantModule, TransactionModule],
    controllers: [
        AppController,
        AuthController,
        TransactionController,
        RestaurantController,
    ],
    providers: [AppService, TransactionService, RestaurantService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/config';

@Module({
    imports: [
        // Configuration of typeorm connection
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: config.databaseHost,
            port: config.databasePort,
            username: config.databaseUser,
            password: config.databasePass,
            database: config.databaseDb,
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
        RestaurantModule,
        TransactionModule,
    ],
})
export class AppModule {}

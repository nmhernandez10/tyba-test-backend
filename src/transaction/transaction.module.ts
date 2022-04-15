import { forwardRef, Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionRepository]),
        forwardRef(() => AuthModule),
    ],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: [TransactionService],
})
export class TransactionModule {}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Get()
    getTransactions(): Promise<Transaction[]> {
        return this.transactionService.getTransactions();
    }
}

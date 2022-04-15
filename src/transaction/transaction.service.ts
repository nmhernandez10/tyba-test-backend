import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './models/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionRepository)
        private transactionRepository: TransactionRepository,
    ) {}

    getTransactions(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    createTransaction(
        createTransaction: CreateTransactionDto,
    ): Promise<Transaction> {
        return this.transactionRepository.save({
            name: createTransaction.name,
            user: createTransaction.user,
        });
    }
}

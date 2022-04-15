import { User } from 'src/auth/user.entity';

export enum TransactionName {
    SIGN_IN = 'SIGN_IN',
    GET_RESTAURANTS = 'GET_RESTAURANTS',
}

export interface CreateTransactionDto {
    name: TransactionName;
    user: User;
}

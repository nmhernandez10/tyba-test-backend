import { Exclude } from 'class-transformer';
import { Transaction } from 'src/transaction/transaction.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude({ toPlainOnly: true }) // Security avoid password on queries
    password: string;

    @OneToMany(() => Transaction, (transaction) => transaction.user, {
        eager: false,
    })
    transactions: Transaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

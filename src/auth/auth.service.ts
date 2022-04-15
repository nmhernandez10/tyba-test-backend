import {
    forwardRef,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './models/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './models/jwt-payload.interface';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionName } from 'src/transaction/models/create-transaction.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
        private jwtService: JwtService,
        @Inject(forwardRef(() => TransactionService))
        private transactionService: TransactionService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;

        // Find user on database
        const user = await this.usersRepository.findOne({ username });

        // Compare password to database saved password
        const compare = await bcrypt.compare(password, user.password);

        if (user && compare) {
            // If user credentials arr correct, create and return access token
            const payload: JwtPayload = { username };
            const accessToken: string = this.jwtService.sign(payload);

            // Try to save SIGN_IN transaction on database
            try {
                await this.transactionService.createTransaction({
                    name: TransactionName.SIGN_IN,
                    user: user,
                });
            } catch (_) {
                Logger.error(
                    `Error saving transaction ${TransactionName.SIGN_IN}`,
                );
            }

            return { accessToken };
        } else {
            // If user credentials are incorrect return unauthorized exception
            throw new UnauthorizedException(
                'Please check your login credentials',
            );
        }
    }
}

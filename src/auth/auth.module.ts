import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { config } from 'src/config/config';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
    imports: [
        // Configuration of passport module for auth
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // Configuration of jwt for token management
        JwtModule.register({
            secret: config.jwtSecret,
            signOptions: {
                expiresIn: +config.appExpires,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
        TransactionModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

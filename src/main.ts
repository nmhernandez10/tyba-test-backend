import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './utils/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable use of validation pipe
    app.useGlobalPipes(new ValidationPipe());

    // Enable use of transformation interceptor
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.listen(3000);
}

bootstrap();

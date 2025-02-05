import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters({
    catch: (exception, host) => {
      const response = host.switchToHttp().getResponse();
      response.status(400).json({ message: exception.message || 'Server Error' });
    },
  });

  await app.listen(3000);
}
bootstrap();

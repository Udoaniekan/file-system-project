import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MulterExceptionFilter } from './multer-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Apply the exception filter globally
   app.useGlobalFilters(new MulterExceptionFilter());
 
   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

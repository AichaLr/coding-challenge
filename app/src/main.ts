import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefixBaseApi = 'api/v1';
  app.setGlobalPrefix(prefixBaseApi);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );
  setupSwagger(app);
  await app.listen(3500);
}
bootstrap();

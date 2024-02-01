import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app) => {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('CODING CHALLENGE API')
    .setDescription('Speceificatons for the coding challenge api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const SWAGGER_ENDPOINT = configService.get('SWAGGER_ENDPOINT');

  SwaggerModule.setup(SWAGGER_ENDPOINT, app, document);
};

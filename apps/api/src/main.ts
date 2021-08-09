/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
  });

  // Port can be overridden by environment
  const port = process.env.PORT || 3000;

  // Set global validator to take advantage of class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Swagger - Pollate')
    .setDescription('The Pollate API Reference')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-docs', app, document);

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();

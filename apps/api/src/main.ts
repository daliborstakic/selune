/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from 'nestjs-pino';
import { DiscoveryService, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ApiBearerAuth, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@selune-backend/auth';

const setupBearerAuthDecorator = (app: INestApplication) => {
  const discoveryService = app.get(DiscoveryService);
  const controllers = discoveryService.getControllers();

  for (const controller of controllers) {
    if (controller.metatype) {
      const controllerClass = controller.metatype.prototype;

      const methods = Object.getOwnPropertyNames(controllerClass).filter(
        (method) => method !== 'constructor',
      );

      for (const method of methods) {
        const isPublic = Reflect.getMetadata(
          IS_PUBLIC_KEY,
          controllerClass[method],
        );

        if (!isPublic) {
          ApiBearerAuth('JWT-auth')(controller.metatype);
        }
      }
    }
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Selune')
    .setDescription('Selune API description')
    .setVersion('1.0')
    .addTag('selune')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  setupBearerAuthDecorator(app);

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();

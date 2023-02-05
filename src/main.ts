import {
  INestApplication,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  query: {
    cache: 2000,
    maxLimit: 50,
    alwaysPaginate: true,
  },
  params: {
    uuid: {
      field: 'uuid',
      type: 'uuid',
      primary: true,
    },
  },
});

import { AppModule } from './modules/app/app.module';
import { TypeOrmExceptionFilter } from './utils/typeormExceptionHandler';

const setupSwagger = (app: INestApplication): void => {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Rock (0) paper (1) scissors (2)')
    .setDescription('Arcade game application by Cecil.A. ')
    .addBearerAuth();

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    cors: true,
  });

  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      forbidUnknownValues: false,
      exceptionFactory: (errors): UnprocessableEntityException =>
        new UnprocessableEntityException(errors),
    }),
  );

  setupSwagger(app);

  await app.listen(parseInt(process.env.APP_PORT));
  console.log(`rock paper scissors api is running on ${process.env.APP_PORT}`);
}
bootstrap();

import {
  ClassSerializerInterceptor,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
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

  await app.listen(parseInt(process.env.APP_PORT));
  console.log(`rock paper scissors api is running on ${process.env.APP_PORT}`);
}
bootstrap();

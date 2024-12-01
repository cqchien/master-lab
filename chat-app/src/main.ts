import './boilerplate.polyfill';

import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { SystemExceptionFilter } from 'filters/exception.filter';
import { SharedModule } from 'shared/shared.module';
import { ApiConfigService } from 'shared/services/api-config.service';
import { setupSwagger } from 'setup-swagger';
import { SerializerInterceptor } from 'interceptors/serializer-interceptor';
import { QueryFailedFilter } from 'filters/query-failed.filter';

export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  app.setGlobalPrefix('/api');
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new SystemExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new SerializerInterceptor(),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  if (!configService.isProduction) {
    setupSwagger(app);
  }

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  const port = configService.appConfig.port;
  await app.listen(port, '0.0.0.0');

  console.info(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { LoggerInterceptor } from '@app/common/interceptors/logger.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'"],
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://cdn.jsdelivr.net',
          ],
          'style-src': [
            "'self'",
            "'unsafe-inline'",
            'https://cdn.jsdelivr.net',
          ],
          'img-src': ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
          'font-src': ["'self'", 'https://cdn.jsdelivr.net'],
        },
      },
    }),
  );
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      validateCustomDecorators: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Nest Template')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      preloadModels: false,
      tryItOutEnabled: true,
      syntaxHighlight: true,
    },
    customSiteTitle: 'Nest Template',
  });
  await app.listen(port);
}

bootstrap();

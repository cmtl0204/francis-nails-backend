import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  ClassSerializerInterceptor,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { join } from 'path';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseHttpInterceptor } from '@utils/interceptors';
import { FIELD_LABEL_KEY } from '@utils/dto-validation';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        const formatErrorMessages = (errors: ValidationError[]) => {
          const messages: string[] = [];

          errors.forEach((error) => {
            const label = error.target
              ? Reflect.getMetadata(
                  FIELD_LABEL_KEY,
                  error.target.constructor.prototype,
                  error.property,
                )
              : null;

            const propertyName = label || error.property;

            if (error.constraints) {
              Object.entries(error.constraints).forEach(([key, msg]) => {
                if (key === 'whitelistValidation') {
                  messages.push(`La propiedad ${error.property} no está permitida`);
                } else {
                  const modifiedMsg = msg.replace(error.property, propertyName);
                  messages.push(modifiedMsg);
                }
              });
            }
          });

          return messages;
        };

        const messages = formatErrorMessages(errors);

        return new UnprocessableEntityException({
          message: messages,
          error: 'Unprocessable Entity',
        });
      },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseHttpInterceptor(),
  );

  // app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix('api/v1');

  app.useStaticAssets(join(process.cwd(), 'public'));

  const documentBuilder = new DocumentBuilder()
    .setTitle('API SIAAW')
    .setDescription('App Description')
    .setVersion('3')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

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
import { AllExceptionsFilter } from '@utils/exceptions';
import { Client } from 'pg'; // Cliente nativo

async function createDatabaseIfNotExists() {
  const dbName = process.env.DB_NAME; // Tu base de datos objetivo

  // 1. Nos conectamos a la base de datos por defecto 'postgres'
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, // La IP de Windows que configuraste
    port: parseInt(process.env.DB_PORT) || 5432,
    database: 'postgres', // IMPORTANTE: Conectarse a 'postgres'
  });

  await client.connect();

  try {
    // 2. Verificamos si la base de datos ya existe
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (res.rowCount === 0) {
      // 3. Si no existe, la creamos
      console.log(`⚠️  La base de datos '${dbName}' no existe. Creándola...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Base de datos '${dbName}' creada exitosamente.`);
    } else {
      console.log(`ℹ️  La base de datos '${dbName}' ya existe.`);
    }
  } catch (error) {
    console.error('❌ Error al verificar/crear la base de datos:', error);
  } finally {
    await client.end(); // Cerramos esta conexión temporal
  }
}

async function bootstrap() {
  await createDatabaseIfNotExists();

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

  app.useGlobalFilters(new AllExceptionsFilter());

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

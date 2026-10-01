import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from '@/app.module.js';
import { v2 as cloudinary } from 'cloudinary';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  await app.listen(process.env.PORT ?? 5005, '0.0.0.0');
}
await bootstrap();

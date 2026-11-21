import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { DominioExceptionFilter } from './shared/infrastructure/http/dominio-exception.filter.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const origenesPermitidos = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((origen) => origen.trim())
    .filter(Boolean);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin:
      origenesPermitidos.length > 0
        ? origenesPermitidos
        : ['http://localhost:5173', 'https://ayni-radar.up.railway.app'],
    credentials: true,
  });

  app.useGlobalFilters(new DominioExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('AyniRadar API')
    .setDescription('Mapa de calor de zonas de desastre y donaciones directas — ABSTRACTHON 2026')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
}

await bootstrap();

/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Cambia por la URL de tu sitio en Netlify
    methods: 'GET,POST,PUT,DELETE',                    // Métodos permitidos
    credentials: true                                  // Permitir el envío de cookies o autenticación
  });
  await app.listen(3000);
}
bootstrap();

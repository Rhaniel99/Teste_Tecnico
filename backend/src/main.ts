import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  // Habilita CORS para permitir chamadas do frontend em http://localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 8080);
}

bootstrap()
  .then(() => console.log('Bootstrap successful'))
  .catch((error) => console.error('Bootstrap error:', error));
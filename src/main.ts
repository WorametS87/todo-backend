import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Simple Todo backend')
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);
      
      // Allow localhost on any port
      if (origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      
      // Deny everything else
      callback(new Error('Not allowed by CORS'));
    },
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = 3002;
  await app.listen(port);

  console.log('-----------------------------');
  console.log(`API running at: http://localhost:${port}`);
  console.log(`Swagger UI:     http://localhost:${port}/docs`);
  console.log('-----------------------------');

}
bootstrap();

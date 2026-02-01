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
    origin: 'http://localhost:5173',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = 3000;
  await app.listen(port);

  console.log('-----------------------------');
  console.log(`API running at: http://localhost:${port}`);
  console.log(`Swagger UI:     http://localhost:${port}/docs`);
  console.log('-----------------------------');

}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    errorHttpStatusCode : 406,
    transform : true 
  }));

  const config = new DocumentBuilder()
    .setTitle('shokworks')
    .setDescription(' shokworks API documentacion')
    .setVersion('1.0')
    .addTag('shokworks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  
  await app.listen(AppModule.port);
}

bootstrap();
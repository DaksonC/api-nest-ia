import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação - POC GPT de Arquivos')
    .setDescription(
      'Esta API permite aos usuários pesquisar e acessar arquivos armazenados no serviço de Armazenamento de Blobs da Microsoft Azure, além de obter respostas de perguntas sobre o conteúdo desses arquivos usando o serviço Azure Cognitive Search e o Azure OpenAI Service.',
    )
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swegger', app, document);

  await app.listen(3000);
}
bootstrap();

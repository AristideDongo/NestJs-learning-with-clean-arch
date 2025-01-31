import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Apprentissage de NestJS avec la cleane architecture')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(
    `L'application est en cours d'exécution sur le port ${'http://localhost:' + port}`,
  );
  console.log(
    `Le Swagger est accessible sur: ${'http://localhost:' + port}/api`,
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import type { INestApplication } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { Modules } from './generated/modules.enum';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new AuthGuard());

  app.setGlobalPrefix('api');
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder().setTitle('API 文档').setDescription('API 描述').setVersion('1.0').addTag(Modules.USERS, '用户相关接口').build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/refs', apiReference({ spec: { content: document } }));
  SwaggerModule.setup('docs', app, document);
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import type { INestApplication } from '@nestjs/common';
import { Modules } from './modules.enum';
import { logger } from './common/middlewares/logger.middleware';
import { AuthGuard } from './common/guards/auth.guard';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder().setTitle('API 文档').setDescription('API 描述').setVersion('1.0').addTag(Modules.USERS, '用户相关接口').build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard());

  app.setGlobalPrefix('api');
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

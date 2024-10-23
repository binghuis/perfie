import { Module, type MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger);
  }
}

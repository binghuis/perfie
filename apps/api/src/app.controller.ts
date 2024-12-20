import { Controller, ForbiddenException, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new ForbiddenException();
    return this.appService.getHello();
  }
}

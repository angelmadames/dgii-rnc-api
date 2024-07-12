import { Controller, Get } from '@nestjs/common';
import type { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Get('/status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Get('/version')
  getVersion() {
    return this.appService.getVersion();
  }
}

import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthContoller {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth(): HttpStatus.OK {
    return this.healthService.checkHealth();
  }
}

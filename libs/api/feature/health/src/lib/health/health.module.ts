import { Module } from '@nestjs/common';
import { HealthContoller } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthContoller],
  providers: [HealthService],
})
export class HealthModule {}

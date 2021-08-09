import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(): HttpStatus.OK {
    return HttpStatus.OK;
  }
}

import { ApiDataAccessQuestionModule } from '@deb8/api/data-access/question';
import { ApiDataAccessResponseModule } from '@deb8/api/data-access/response';
import { Deb8GatewayModule } from '@deb8/api/shared/gateway/deb8';
import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';

@Module({
  imports: [
    ApiDataAccessResponseModule,
    ApiDataAccessQuestionModule,
    Deb8GatewayModule,
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}

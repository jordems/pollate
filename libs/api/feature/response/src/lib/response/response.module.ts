import { Module } from '@nestjs/common';
import { ApiDataAccessQuestionModule } from '@pollate/api/data-access/question';
import { ApiDataAccessResponseModule } from '@pollate/api/data-access/response';
import { QuestionGatewayModule } from '@pollate/api/shared/gateway/question';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';

@Module({
  imports: [
    ApiDataAccessResponseModule,
    ApiDataAccessQuestionModule,
    QuestionGatewayModule,
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}

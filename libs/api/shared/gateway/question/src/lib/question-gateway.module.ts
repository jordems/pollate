import { Module } from '@nestjs/common';
import { ApiDataAccessChatModule } from '@pollate/api/data-access/chat';
import { ApiDataAccessQuestionModule } from '@pollate/api/data-access/question';
import { ApiDataAccessResponseModule } from '@pollate/api/data-access/response';
import { QuestionDataAccessService } from './question-data-access.service';
import { QuestionGatewayService } from './question-gateway.service';
import { QuestionGateway } from './question.gateway';

@Module({
  imports: [
    ApiDataAccessChatModule,
    ApiDataAccessResponseModule,
    ApiDataAccessQuestionModule,
  ],
  providers: [
    QuestionGatewayService,
    QuestionGateway,
    QuestionDataAccessService,
  ],
  exports: [QuestionGatewayService],
})
export class QuestionGatewayModule {}

import { Module } from '@nestjs/common';
import { ApiDataAccessChatModule } from '@pollate/api/data-access/chat';
import { ApiDataAccessResponseModule } from '@pollate/api/data-access/response';
import { QuestionGatewayService } from './question-gateway.service';
import { QuestionGateway } from './question.gateway';

@Module({
  imports: [ApiDataAccessChatModule, ApiDataAccessResponseModule],
  providers: [QuestionGatewayService, QuestionGateway],
  exports: [QuestionGatewayService],
})
export class QuestionGatewayModule {}

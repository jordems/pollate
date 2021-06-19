import { Module } from '@nestjs/common';
import { ApiDataAccessChatModule } from '@pollate/api/data-access/chat';
import { ApiDataAccessQuestionModule } from '@pollate/api/data-access/question';
import { ApiDataAccessUserModule } from '@pollate/api/data-access/user';
import { QuestionGatewayModule } from '@pollate/api/shared/gateway/question';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    ApiDataAccessUserModule,
    ApiDataAccessChatModule,
    ApiDataAccessQuestionModule,
    QuestionGatewayModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

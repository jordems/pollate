import { ApiDataAccessChatModule } from '@deb8/api/data-access/chat';
import { ApiDataAccessUserModule } from '@deb8/api/data-access/user';
import { Deb8GatewayModule } from '@deb8/api/shared/gateway/deb8';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    ApiDataAccessUserModule,
    ApiDataAccessChatModule,
    Deb8GatewayModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

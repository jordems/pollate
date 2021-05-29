import { ApiDataAccessChatModule } from '@deb8/api/data-access/chat';
import { ApiDataAccessResponseModule } from '@deb8/api/data-access/response';
import { Module } from '@nestjs/common';
import { Deb8GatewayService } from './deb8-gateway.service';
import { Deb8Gateway } from './deb8.gateway';

@Module({
  imports: [ApiDataAccessChatModule, ApiDataAccessResponseModule],
  providers: [Deb8GatewayService, Deb8Gateway],
  exports: [Deb8GatewayService],
})
export class Deb8GatewayModule {}

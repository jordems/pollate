import { MessageModelService } from '@deb8/api/data-access/chat';
import { ResponseModelService } from '@deb8/api/data-access/response';
import { isObjectId } from '@deb8/api/shared/util/mongoose';
import { Deb8ConnectedEvent, DEB8_NAMESPACE } from '@deb8/type';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as SocketIO from 'socket.io';
import { Deb8GatewayService } from './deb8-gateway.service';

@WebSocketGateway({ namespace: DEB8_NAMESPACE })
export class Deb8Gateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server!: SocketIO.Server;

  constructor(
    private readonly deb8GatewayService: Deb8GatewayService,
    private readonly messageModelService: MessageModelService,
    private readonly responseModelService: ResponseModelService
  ) {}

  afterInit(server: SocketIO.Server): void {
    this.deb8GatewayService.init(server);
  }

  async handleConnection(client: SocketIO.Socket): Promise<void> {
    const { questionId } = client.handshake.query;

    if (questionId === null || !isObjectId(questionId)) {
      Logger.log('Gateway - Missing `questionId` as input');
      client.disconnect();
      return;
    }

    Logger.log(
      `Gateway - Client Connected ${questionId}:${client.handshake.address}`
    );
    client.join(questionId);

    client.emit('connected', await this.fetchOnConnectedData(questionId));
  }

  handleDisconnect(client: SocketIO.Socket): void {
    const questionId = client.handshake.query.questionId as string;

    Logger.log(
      `Gateway - Client Disconnected ${questionId}:${client.handshake.address}`
    );
    client.leave(questionId);
  }

  private async fetchOnConnectedData(
    questionId: string
  ): Promise<Deb8ConnectedEvent | null> {
    const messages = await this.messageModelService.findMessagesOnQuestion(
      questionId,
      { startId: null, limit: 50 }
    );

    const responses = await this.responseModelService.findAllOnQuestion(
      questionId
    );

    return {
      messages: messages.map((message) =>
        MessageModelService.toMinimal(message)
      ),
      responses: responses.map((response) =>
        ResponseModelService.toMinimal(response)
      ),
    };
  }
}

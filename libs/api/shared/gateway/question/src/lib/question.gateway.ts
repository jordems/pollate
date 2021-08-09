import { Logger } from '@nestjs/common';
import '@nestjs/platform-socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { isObjectId } from '@pollate/api/shared/util/mongoose';
import { QUESTION_NAMESPACE } from '@pollate/type';
import * as SocketIO from 'socket.io';
import { QuestionDataAccessService } from './question-data-access.service';
import { QuestionGatewayService } from './question-gateway.service';

@WebSocketGateway({ namespace: QUESTION_NAMESPACE })
export class QuestionGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server!: SocketIO.Server;

  constructor(
    private readonly questionGatewayService: QuestionGatewayService,
    private readonly questionDataAccessService: QuestionDataAccessService
  ) {}

  afterInit(server: SocketIO.Server): void {
    this.questionGatewayService.init(server);
  }

  async handleConnection(client: SocketIO.Socket): Promise<void> {
    const { questionId, userId } = client.handshake.query;

    if (questionId === null || !isObjectId(questionId)) {
      Logger.log('Gateway - Missing `questionId` as input');
      client.disconnect();
      return;
    }

    Logger.log(
      `Gateway - Client Connected ${questionId}:${userId || 'anon'}:${
        client.handshake.address
      }`
    );
    client.join(questionId);

    client.emit(
      'connected',
      await this.questionDataAccessService.fetchOnConnectedData(
        questionId,
        userId
      )
    );
  }

  handleDisconnect(client: SocketIO.Socket): void {
    const { questionId } = client.handshake.query;

    Logger.log(
      `Gateway - Client Disconnected ${questionId}:${client.handshake.address}`
    );
    client.leave(questionId);
  }
}

import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageModelService } from '@pollate/api/data-access/chat';
import { ResponseModelService } from '@pollate/api/data-access/response';
import { isObjectId } from '@pollate/api/shared/util/mongoose';
import { QuestionConnectedEvent, QUESTION_NAMESPACE } from '@pollate/type';
import * as SocketIO from 'socket.io';
import { QuestionGatewayService } from './question-gateway.service';

@WebSocketGateway({ namespace: QUESTION_NAMESPACE })
export class QuestionGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server!: SocketIO.Server;

  constructor(
    private readonly questionGatewayService: QuestionGatewayService,
    private readonly messageModelService: MessageModelService,
    private readonly responseModelService: ResponseModelService
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
      await this.fetchOnConnectedData(questionId, userId as string)
    );
  }

  handleDisconnect(client: SocketIO.Socket): void {
    const questionId = client.handshake.query.questionId as string;

    Logger.log(
      `Gateway - Client Disconnected ${questionId}:${client.handshake.address}`
    );
    client.leave(questionId);
  }

  private async fetchOnConnectedData(
    questionId: string,
    userId: string | null
  ): Promise<QuestionConnectedEvent | null> {
    const messages = await this.messageModelService.findMessagesOnQuestion(
      questionId,
      { startId: null, limit: 50 }
    );

    const responses = await this.responseModelService.findAllOnQuestion(
      questionId
    );

    const userResponse = userId
      ? await this.responseModelService.findUsersResponseOnQuestion(
          questionId,
          userId
        )
      : null;

    return {
      messages: messages.map((message) =>
        MessageModelService.toMinimal(message)
      ),
      responses: responses.map((response) =>
        ResponseModelService.toMinimal(response)
      ),
      userResponse,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { QuestionWSEvent, QuestionWSEventMap } from '@pollate/type';
import * as SocketIO from 'socket.io';

@Injectable()
export class QuestionGatewayService {
  private server: SocketIO.Server;

  /**
   * Gateway initializes the gateway service on start
   */
  init(server: SocketIO.Server): void {
    this.server = server;
  }

  /**
   * Emit a pollate websocket event
   *
   * @param questionId - Question this event will be emitted to
   * @param event - Type of event that is being emitted
   * @param data - Data associated with the event type
   */
  emit<Event extends QuestionWSEvent, Data extends QuestionWSEventMap[Event]>(
    questionId: string,
    event: Event,
    data: Data
  ): void {
    this.server.to(questionId).emit(event, data);
  }
}

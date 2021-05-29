import { Deb8WSEvent, Deb8WSEventMap } from '@deb8/type/deb8';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import * as SocketIO from 'socket.io';

@Injectable()
export class Deb8GatewayService {
  private server: SocketIO.Server;

  /**
   * Gateway initializes the gateway service on start
   */
  init(server: SocketIO.Server): void {
    this.server = server;
  }

  /**
   * Emit a deb8 websocket event
   *
   * @param questionId - Question this event will be emitted to
   * @param event - Type of event that is being emitted
   * @param data - Data associated with the event type
   */
  emit<Event extends Deb8WSEvent, Data extends Deb8WSEventMap[Event]>(
    questionId: ObjectId & string,
    event: Event,
    data: Data
  ): void {
    this.server.to(questionId).emit(event, data);
  }
}

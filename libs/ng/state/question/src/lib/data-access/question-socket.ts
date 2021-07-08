import {
  QuestionConnectionRequest,
  QuestionWSEvent,
  QuestionWSEventMap,
} from '@pollate/type';
import { Socket } from 'ngx-socket-io';

export class QuestionSocket extends Socket {
  connected$ = this.fromQuestionEvent('connected');
  onMessage$ = this.fromQuestionEvent('onMessage');
  onUpdateResponseDelta$ = this.fromQuestionEvent('onUpdateResponseDelta');

  constructor(apiUrl: string, request: QuestionConnectionRequest) {
    super({
      url: `${apiUrl.replace('/v1', '')}question`,
      options: {
        transports: ['websocket', 'polling'],
        query: request,
        reconnection: true,
      },
    });
  }

  /**
   * Dynamically fills in the appropriate return type, given the event type
   */
  private fromQuestionEvent<
    EventType extends QuestionWSEvent,
    EventData extends QuestionWSEventMap[EventType]
  >(event: EventType) {
    return this.fromEvent<EventData>(event);
  }
}

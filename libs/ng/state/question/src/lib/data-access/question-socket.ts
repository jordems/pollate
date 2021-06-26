import {
  QuestionConnectionRequest,
  QuestionWSEvent,
  QuestionWSEventMap,
} from '@pollate/type';
import { Socket } from 'ngx-socket-io';

export class QuestionSocket extends Socket {
  connected$ = this.fromQuestionEvent('connected');
  onMessage$ = this.fromQuestionEvent('onMessage');
  onUpsertResponse$ = this.fromQuestionEvent('onUpsertResponse');

  // Definitely not the best way to do it
  private static getQuestionIdFromUrl(url: string): string {
    const pieces = url.split('/');

    const questionId = pieces.pop() || pieces.pop();

    if (!questionId) {
      throw new Error('Question Id not given');
    }
    return questionId;
  }

  constructor(apiUrl: string, request: QuestionConnectionRequest) {
    super({
      url: `${apiUrl}question`,
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

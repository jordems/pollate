import { Injectable } from '@angular/core';
import { QuestionWSEvent, QuestionWSEventMap } from '@pollate/type';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class QuestionSocketService extends Socket {
  connected$ = this.fromQuestionEvent('connected');
  onMessage$ = this.fromQuestionEvent('onMessage');
  onUpsertResponse$ = this.fromQuestionEvent('onUpsertResponse');

  constructor() {
    super({
      url: 'http://localhost:3000/question',
      options: {
        transports: ['websocket', 'polling'],
        query: {
          questionId: '60b330dd2531454ab92efb07',
          userId: '',
        },
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

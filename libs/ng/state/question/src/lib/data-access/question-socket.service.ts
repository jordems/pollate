import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import { QuestionWSEvent, QuestionWSEventMap } from '@pollate/type';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class QuestionSocketService extends Socket {
  connected$ = this.fromQuestionEvent('connected');
  onMessage$ = this.fromQuestionEvent('onMessage');
  onUpsertResponse$ = this.fromQuestionEvent('onUpsertResponse');

  constructor(@Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment) {
    super({
      url: `${env.api}question`,
      options: {
        transports: ['websocket', 'polling'],
        query: {
          questionId: '60c590e7549ab522c32ca1a2',
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

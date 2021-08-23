import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  DisplayMessage,
  DisplayResponse,
  MemoizedQuestionData,
  Question,
  QuestionConnectedEvent,
  Response,
} from '@pollate/type';
import { Observable } from 'rxjs';
import {
  createMessage,
  createResponse,
  loadQuestion,
} from './question-state.actions';
import {
  selectDisplayMessages,
  selectLoaded,
  selectMemoizedQuestionData,
  selectQuestion,
  selectResponseOptions,
  selectUserInteractionMap,
  selectUserResponse,
} from './question-state.selectors';

@Injectable({ providedIn: 'root' })
export class QuestionStateFacade {
  constructor(private store: Store) {}

  // Selectors
  selectLoaded(): Observable<boolean> {
    return this.store.pipe(select(selectLoaded));
  }
  selectQuestion(): Observable<Question | null> {
    return this.store.pipe(select(selectQuestion));
  }
  selectDisplayMessages(): Observable<DisplayMessage[]> {
    return this.store.pipe(select(selectDisplayMessages));
  }
  selectMemoizedQuestionData(): Observable<MemoizedQuestionData> {
    return this.store.pipe(select(selectMemoizedQuestionData));
  }
  selectUserResponse(): Observable<Response | null> {
    return this.store.pipe(select(selectUserResponse));
  }
  selectResponseOptions(): Observable<DisplayResponse[]> {
    return this.store.pipe(select(selectResponseOptions));
  }
  selectUserInteractionMap(): Observable<
    QuestionConnectedEvent['userInteractionMap']
  > {
    return this.store.pipe(select(selectUserInteractionMap));
  }

  // Actions
  initialize(stub: string): void {
    this.store.dispatch(loadQuestion({ stub }));
  }

  createResponse(response: string): void {
    this.store.dispatch(createResponse({ response }));
  }

  sendMessage(message: string): void {
    this.store.dispatch(createMessage({ text: message }));
  }
}

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MinimalMessage, MinimalResponse, Response } from '@pollate/type';
import { Observable } from 'rxjs';
import {
  createMessage,
  createResponse,
  loadQuestion,
} from './question-state.actions';
import {
  selectMessages,
  selectResponses,
  selectUserResponse,
} from './question-state.selectors';

@Injectable({ providedIn: 'root' })
export class QuestionStateFacade {
  constructor(private store: Store) {}

  // Selectors
  selectMessages(): Observable<MinimalMessage[]> {
    return this.store.pipe(select(selectMessages));
  }
  selectResponses(): Observable<MinimalResponse[]> {
    return this.store.pipe(select(selectResponses));
  }
  selectUserResponse(): Observable<Response | null> {
    return this.store.pipe(select(selectUserResponse));
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from '@pollate/ng/shared/auth';
import { QuestionStateFacade } from '@pollate/ng/state/question';
import {
  DisplayMessage,
  DisplayResponse,
  MemoizedQuestionData,
  Question,
  QuestionConnectedEvent,
  Response,
  User,
} from '@pollate/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'pollate-voter-feature',
  templateUrl: './voter-feature.component.html',
})
export class VoterFeatureComponent {
  question$: Observable<Question | null>;
  responseOptions$: Observable<DisplayResponse[]>;
  memoizedQuestionData$: Observable<MemoizedQuestionData>;
  messages$: Observable<DisplayMessage[]>;
  userResponse$: Observable<Response | null>;
  userInteractionMap$: Observable<QuestionConnectedEvent['userInteractionMap']>;
  user$: Observable<User | null>;

  constructor(
    private readonly questionStateFacade: QuestionStateFacade,
    private readonly ngAuthService: NgAuthService,
    private readonly router: Router
  ) {
    this.questionStateFacade.initialize(
      VoterFeatureComponent.getStubFromUrl(this.router.url)
    );

    this.question$ = this.questionStateFacade.selectQuestion();
    this.responseOptions$ = this.questionStateFacade.selectResponseOptions();
    this.memoizedQuestionData$ = this.questionStateFacade.selectMemoizedQuestionData();
    this.messages$ = this.questionStateFacade.selectDisplayMessages();
    this.userResponse$ = this.questionStateFacade.selectUserResponse();
    this.userInteractionMap$ = this.questionStateFacade.selectUserInteractionMap();
    this.user$ = this.ngAuthService.getUser();
  }

  // Definitely not the best way to do this c:
  private static getStubFromUrl(url: string): string {
    const pieces = url.split('/');

    const questionId = pieces.pop() || pieces.pop();

    if (!questionId) {
      throw new Error('Question Id not given');
    }
    return questionId.split(';')[0];
  }

  sendMessage(message: string): void {
    this.questionStateFacade.sendMessage(message);
  }

  makeResponse(response: string): void {
    this.questionStateFacade.createResponse(response);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionStateFacade } from '@pollate/ng/state/question';
import { MemoizedQuestionData, MinimalMessage, Response } from '@pollate/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'pollate-voter-feature',
  templateUrl: './voter-feature.component.html',
})
export class VoterFeatureComponent {
  responseOptions$: Observable<string[]>;
  memoizedQuestionData$: Observable<MemoizedQuestionData>;
  messages$: Observable<MinimalMessage[]>;
  userResponse$: Observable<Response | null>;

  constructor(
    private readonly questionStateFacade: QuestionStateFacade,
    private readonly router: Router
  ) {
    this.questionStateFacade.initialize(
      VoterFeatureComponent.getStubFromUrl(this.router.url)
    );

    this.responseOptions$ = this.questionStateFacade.selectResponseOptions();
    this.memoizedQuestionData$ = this.questionStateFacade.selectMemoizedQuestionData();
    this.messages$ = this.questionStateFacade.selectMessages();
    this.userResponse$ = this.questionStateFacade.selectUserResponse();
  }

  // Definitely not the best way to do it
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionStateFacade } from '@pollate/ng/state/question';

@Component({
  selector: 'pollate-voter-feature',
  templateUrl: './voter-feature.component.html',
})
export class VoterFeatureComponent {
  // Definitely not the best way to do it
  private static getStubFromUrl(url: string): string {
    const pieces = url.split('/');

    const questionId = pieces.pop() || pieces.pop();

    if (!questionId) {
      throw new Error('Question Id not given');
    }
    return questionId.split(';')[0];
  }

  constructor(
    private readonly questionStateFacade: QuestionStateFacade,
    private readonly router: Router
  ) {
    this.questionStateFacade.initialize(
      VoterFeatureComponent.getStubFromUrl(router.url)
    );
  }
}

import { Component } from '@angular/core';
import { NgAuthService } from '@pollate/ng/shared/auth';
import { Observable } from 'rxjs';
import { BuilderStore } from './store/builder.store';

@Component({
  selector: 'pollate-builder-feature',
  templateUrl: './builder-feature.component.html',
})
export class BuilderFeatureComponent {
  submissionLoading$: Observable<boolean>;

  constructor(
    private readonly builderStore: BuilderStore,
    private readonly ngAuthService: NgAuthService
  ) {
    this.submissionLoading$ = this.builderStore.submissionLoading$;
  }

  updateQuestion(question: string): void {
    this.builderStore.updateQuestion(question);
  }

  updateResponses(responses: string[]): void {
    this.builderStore.updateResponses(responses);
  }

  createQuestion() {
    this.builderStore.createQuestion();
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BuilderStore } from './store/builder.store';

@Component({
  selector: 'pollate-builder-feature',
  templateUrl: './builder-feature.component.html',
})
export class BuilderFeatureComponent {
  $submissionLoading: Observable<boolean>;

  constructor(private readonly builderStore: BuilderStore) {
    this.$submissionLoading = this.builderStore.submissionLoading$;
  }

  updateQuestion(question: string) {
    this.builderStore.updateQuestion(question);
  }

  updateResponses(responses: string[]) {
    this.builderStore.updateResponses(responses);
  }

  createQuestion() {
    this.builderStore.createQuestion();
  }
}

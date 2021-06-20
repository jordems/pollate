import { Component } from '@angular/core';
import { BuilderStore } from './state/builder.store';

@Component({
  selector: 'pollate-builder-feature',
  templateUrl: './builder-feature.component.html',
})
export class BuilderFeatureComponent {
  constructor(private readonly builderStore: BuilderStore) {}

  addResponse = this.builderStore.addResponse;
  removeResponse = this.builderStore.removeResponse;
  updateResponses = this.builderStore.updateResponses;
  updateQuestion = this.builderStore.updateQuestion;
  submit = this.builderStore.submit;
}

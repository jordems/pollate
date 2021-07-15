import { Component } from '@angular/core';
import { NgAuthService } from '@pollate/ng/shared/auth';
import { User } from '@pollate/type';
import { Observable } from 'rxjs';
import { BuilderStore } from './store/builder.store';

@Component({
  selector: 'pollate-builder-feature',
  templateUrl: './builder-feature.component.html',
})
export class BuilderFeatureComponent {
  submissionLoading$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(
    private readonly builderStore: BuilderStore,
    private readonly ngAuthService: NgAuthService
  ) {
    this.submissionLoading$ = this.builderStore.submissionLoading$;
    this.user$ = this.ngAuthService.user$;

    this.user$.subscribe((d) => {
      console.log(d);
    });
  }

  updateQuestion(question: string) {
    this.builderStore.updateQuestion(question);
  }

  updateResponses(responses: string[]) {
    this.builderStore.updateResponses(responses);
  }

  createQuestion() {
    this.ngAuthService.googleLogin();
    //this.builderStore.createQuestion();
  }
}

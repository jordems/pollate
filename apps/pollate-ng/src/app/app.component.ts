import { Component } from '@angular/core';
import { QuestionStateFacade } from '@pollate/ng/state/question';
import { MinimalMessage, MinimalResponse } from '@pollate/type';
import { Observable } from 'rxjs';
@Component({
  selector: 'pollate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  messages$: Observable<MinimalMessage[]>;
  responses$: Observable<MinimalResponse[]>;

  constructor(private readonly questionStateFacacde: QuestionStateFacade) {
    this.messages$ = this.questionStateFacacde.selectMessages();
    this.responses$ = this.questionStateFacacde.selectResponses();
  }
}

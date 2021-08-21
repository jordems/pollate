import { Component, Input } from '@angular/core';
import { Question } from '@pollate/type';

@Component({
  selector: 'pollate-question-display-ui',
  templateUrl: './question-display-ui.component.html',
  styleUrls: ['./question-display-ui.component.scss'],
})
export class QuestionDisplayUIComponent {
  @Input() question!: Question | null;
}

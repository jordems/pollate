import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestionDisplayUIComponent } from './question-display-ui.component';

@NgModule({
  imports: [CommonModule],
  declarations: [QuestionDisplayUIComponent],
  exports: [QuestionDisplayUIComponent],
})
export class QuestionDisplayUIModule {}

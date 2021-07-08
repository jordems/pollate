import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResultsUIComponent } from './results-ui.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ResultsUIComponent],
  exports: [ResultsUIComponent],
})
export class ResultsUIModule {}

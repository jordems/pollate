import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PollUIComponent } from './poll-ui.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PollUIComponent],
  exports: [PollUIComponent],
})
export class PollUIModule {}

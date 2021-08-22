import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatUIComponent } from './chat-ui.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [ChatUIComponent],
  exports: [ChatUIComponent],
})
export class ChatUIModule {}

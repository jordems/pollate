import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuilderUIComponent } from './builder-ui.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [BuilderUIComponent],
  exports: [BuilderUIComponent],
})
export class BuilderUIModule {}

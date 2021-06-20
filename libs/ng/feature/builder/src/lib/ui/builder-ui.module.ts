import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BuilderUIComponent } from './builder-ui.component';

@NgModule({
  imports: [CommonModule, MatFormFieldModule],
  declarations: [BuilderUIComponent],
  exports: [BuilderUIComponent],
})
export class BuilderUIModule {}

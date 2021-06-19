import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BuilderUIComponent } from './builder-ui.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BuilderUIComponent],
  exports: [BuilderUIComponent],
})
export class BuilderUIModule {}

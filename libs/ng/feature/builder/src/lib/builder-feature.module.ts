import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BuilderFeatureRoutingModule } from './builder-feature-routing.module';
import { BuilderFeatureComponent } from './builder-feature.component';
import { BuilderUIModule } from './ui/builder-ui.module';

@NgModule({
  imports: [CommonModule, BuilderFeatureRoutingModule, BuilderUIModule],
  declarations: [BuilderFeatureComponent],
})
export class BuilderFeatureModule {}

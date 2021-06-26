import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VoterFeatureRoutingModule } from './voter-feature-routing.module';
import { VoterFeatureComponent } from './voter-feature.component';

@NgModule({
  imports: [CommonModule, VoterFeatureRoutingModule],
  declarations: [VoterFeatureComponent],
})
export class VoterFeatureModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgStateQuestionModule } from '@pollate/ng/state/question';
import { VoterFeatureRoutingModule } from './voter-feature-routing.module';
import { VoterFeatureComponent } from './voter-feature.component';

@NgModule({
  imports: [CommonModule, VoterFeatureRoutingModule, NgStateQuestionModule],
  declarations: [VoterFeatureComponent],
})
export class VoterFeatureModule {}

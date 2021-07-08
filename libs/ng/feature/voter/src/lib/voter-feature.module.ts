import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgStateQuestionModule } from '@pollate/ng/state/question';
import { ChatUIModule } from './chat/chat-ui.module';
import { PollUIModule } from './poll/poll-ui.module';
import { ResultsUIModule } from './results/results-ui.module';
import { VoterFeatureRoutingModule } from './voter-feature-routing.module';
import { VoterFeatureComponent } from './voter-feature.component';

@NgModule({
  imports: [
    CommonModule,
    VoterFeatureRoutingModule,
    NgStateQuestionModule,
    ChatUIModule,
    PollUIModule,
    ResultsUIModule,
  ],
  declarations: [VoterFeatureComponent],
})
export class VoterFeatureModule {}

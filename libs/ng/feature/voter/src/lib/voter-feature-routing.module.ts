import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoterFeatureComponent } from './voter-feature.component';

/**
 * TODO Dont use router here, make a shell, voter and chat....
 */

const routes: Routes = [
  {
    path: '',
    component: VoterFeatureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterFeatureRoutingModule {}

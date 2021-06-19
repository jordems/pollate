import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderFeatureComponent } from './builder-feature.component';

const routes: Routes = [
  {
    path: '',
    component: BuilderFeatureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderFeatureRoutingModule {}

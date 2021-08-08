import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@pollate/ng/feature/builder').then((m) => m.BuilderFeatureModule),
  },
  {
    path: ':stub',
    loadChildren: () =>
      import('@pollate/ng/feature/voter').then((m) => m.VoterFeatureModule),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

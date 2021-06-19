import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BuilderStateEffects } from './builder-state.effects';
import { builderReducer } from './builder-state.reducer';
import { BUILDER_STATE } from './builder.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(BUILDER_STATE, builderReducer),
    EffectsModule.forFeature([BuilderStateEffects]),
  ],
})
export class BuilderStateModule {}

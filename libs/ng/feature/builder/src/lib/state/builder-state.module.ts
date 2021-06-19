import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { builderReducer } from './builder-state.reducer';
import { BUILDER_STATE } from './builder.state';
import { QuestionStateEffects } from './question-state.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(BUILDER_STATE, builderReducer),
    EffectsModule.forFeature([QuestionStateEffects]),
  ],
})
export class BuilderStateModule {}

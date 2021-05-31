import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { QuestionStateEffects } from './question-state.effects';
import { questionReducer } from './question-state.reducer';
import { QUESTION_STATE } from './question.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(QUESTION_STATE, questionReducer),
    EffectsModule.forFeature([QuestionStateEffects]),
  ],
})
export class NgStateQuestionModule {}

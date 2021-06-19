import { createFeatureSelector } from '@ngrx/store';
import { BuilderState, BUILDER_STATE } from './builder.state';

export const selectState = createFeatureSelector<BuilderState>(BUILDER_STATE);

import { Action, createReducer } from '@ngrx/store';
import { BuilderState, initialBuilderState } from './builder.state';

export function builderReducer(
  state: BuilderState | undefined,
  action: Action
): BuilderState {
  return createReducer<BuilderState>(initialBuilderState)(state, action);
}

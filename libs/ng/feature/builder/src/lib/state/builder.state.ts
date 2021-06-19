export const BUILDER_STATE = 'builder';

export interface BuilderState {
  test: string;
}

export const initialBuilderState: BuilderState = {
  test: '',
};

export const BUILDER_STATE = 'builder';

export interface BuilderState {}

export const initialBuilderState: BuilderState = {
  messages: [],
  responses: [],
  userResponse: null,
};

import { MinimalMessage } from '../message';
import { MinimalResponse } from '../response';

export const DEB8_NAMESPACE = 'deb8' as const;

export type Deb8WSEvent = 'connected' | 'onMessage' | 'onUpsertResponse';

export interface Deb8ConnectedEvent {
  messages: MinimalMessage[];
  responses: MinimalResponse[];
}

export interface Deb8OnMessageEvent {
  message: MinimalMessage;
}

export interface Deb8OnUpsertResponse {
  response: MinimalResponse;
}

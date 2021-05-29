import { MinimalMessage } from '../message';
import { MinimalResponse } from '../response';

export const DEB8_NAMESPACE = 'deb8' as const;

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

export interface Deb8WSEventMap {
  connected: Deb8ConnectedEvent;
  onMessage: Deb8OnMessageEvent;
  onUpsertResponse: Deb8OnUpsertResponse;
}

export type Deb8WSEvent = keyof Deb8WSEventMap;

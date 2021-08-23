import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DisplayResponse, Response } from '@pollate/type';

@Component({
  selector: 'pollate-poll-ui',
  templateUrl: './poll-ui.component.html',
  styleUrls: ['./poll-ui.component.scss'],
})
export class PollUIComponent {
  @Input() responses!: DisplayResponse[];

  @Input() userResponse!: Response | null;

  @Output() upsertResponse: EventEmitter<string>;

  constructor() {
    this.upsertResponse = new EventEmitter();
  }

  makeResponse(response: string): void {
    this.upsertResponse.emit(response);
  }
}

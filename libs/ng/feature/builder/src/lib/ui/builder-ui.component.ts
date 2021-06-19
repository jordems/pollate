import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pollate-builder-ui',
  templateUrl: './builder-ui.component.html',
  styleUrls: ['./builder-ui.component.scss'],
})
export class BuilderUIComponent {
  constructor() {}

      questionControl = new FormControl({
    question: ['',Validators.maxLength(3)],
    responses: [['', '', ''], Validators.],
  });

  responseControl = [
      new FormControl()
  ]


}

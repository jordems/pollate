import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pollate-builder-ui',
  templateUrl: './builder-ui.component.html',
  styleUrls: ['./builder-ui.component.scss'],
})
export class BuilderUIComponent {
  questionControl = new FormControl({
    question: ['', Validators.maxLength(3)],
    responses: [['', '', '']],
  });

  responseControl = [new FormControl()];
}

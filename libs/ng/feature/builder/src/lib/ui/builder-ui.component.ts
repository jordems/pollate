import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pollate-builder-ui',
  templateUrl: './builder-ui.component.html',
  styleUrls: ['./builder-ui.component.scss'],
})
export class BuilderUIComponent implements OnInit {
  @Input() addResponse!: () => void;
  @Input() removeResponse!: (idx: number) => void;
  @Input() updateResponses!: (value: string[]) => void;
  @Input() updateQuestion!: (value: string) => void;
  @Input() submit!: () => void;

  questionControl = new FormControl({
    question: ['', Validators.maxLength(3)],
    responses: [['', '', '']],
  });

  ngOnInit(): void {
    // TODO destroy gracefully
    this.questionControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((changes) => {
        const { question, responses } = changes;

        this.updateQuestion(question);
        this.updateResponses(responses);
      });
  }
}

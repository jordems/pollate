import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pollate-builder-ui',
  templateUrl: './builder-ui.component.html',
  styleUrls: ['./builder-ui.component.scss'],
})
export class BuilderUIComponent implements OnInit {
  private static DEFAULT_STARTING_RESPONSES = 3;

  @Input() addResponse!: () => void;
  @Input() removeResponse!: (idx: number) => void;
  @Input() updateResponses!: (value: string[]) => void;
  @Input() updateQuestion!: (value: string) => void;
  @Input() submit!: () => void;

  formGroup!: FormGroup;
  questionControl!: FormControl;
  responseControls: FormControl[] = [];

  ngOnInit(): void {
    this.questionControl = new FormControl('', Validators.minLength(3));

    this.responseControls = new Array(
      BuilderUIComponent.DEFAULT_STARTING_RESPONSES
    )
      .fill(null)
      .map(() => new FormControl('', Validators.minLength(1)));

    this.formGroup = new FormGroup({
      question: this.questionControl,
      ...this.responseControls.reduce(
        (prev, cur, idx) => ({
          ...prev,
          [`response${idx}`]: cur,
        }),
        {}
      ),
    });

    // TODO destroy gracefully
    console.log(this.formGroup.value);

    this.formGroup.valueChanges.pipe(debounceTime(200)).subscribe((changes) => {
      const { question, responses } = changes;
      console.log(changes);

      this.updateQuestion(question);
      this.updateResponses(responses);
    });
  }
}

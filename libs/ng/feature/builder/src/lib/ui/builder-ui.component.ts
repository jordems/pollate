import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'pollate-builder-ui',
  templateUrl: './builder-ui.component.html',
  styleUrls: ['./builder-ui.component.scss'],
})
export class BuilderUIComponent implements OnInit {
  private static DEFAULT_STARTING_RESPONSES = 3;

  @Output() updateResponses!: EventEmitter<string[]>;
  @Output() updateQuestion!: EventEmitter<string>;
  @Output() createQuestion!: EventEmitter<undefined>;

  formGroup: FormGroup;

  get responses() {
    return this.formGroup.get('responses') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.updateResponses = new EventEmitter();
    this.updateQuestion = new EventEmitter();
    this.createQuestion = new EventEmitter();

    this.formGroup = this.formBuilder.group({
      question: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      responses: this.formBuilder.array(
        new Array(BuilderUIComponent.DEFAULT_STARTING_RESPONSES)
          .fill(null)
          .map(() => this.createResponseControl()),
        [Validators.required, Validators.minLength(2), Validators.maxLength(10)]
      ),
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(debounceTime(200)).subscribe((changes) => {
      const { question, responses } = changes;

      this.updateQuestion.emit(question);
      this.updateResponses.emit(responses);
    });
  }

  addResponse(): void {
    this.responses.push(this.createResponseControl());
  }

  removeResponse(idx: number): void {
    this.responses.removeAt(idx);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.createQuestion.emit();
    }
  }

  private createResponseControl() {
    return this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]);
  }
}

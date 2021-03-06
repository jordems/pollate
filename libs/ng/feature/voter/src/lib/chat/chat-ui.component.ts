import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DisplayMessage, User } from '@pollate/type';

@Component({
  selector: 'pollate-chat-ui',
  templateUrl: './chat-ui.component.html',
  styleUrls: ['./chat-ui.component.scss'],
})
export class ChatUIComponent {
  @Input() messages!: DisplayMessage[];
  @Input() user!: User;

  @Output() sendMessage!: EventEmitter<string>;

  formGroup: FormGroup;

  get message() {
    return this.formGroup.get('message') as FormControl;
  }

  constructor(private formBuilder: FormBuilder) {
    this.sendMessage = new EventEmitter();

    this.formGroup = this.formBuilder.group({
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.sendMessage.emit(this.message.value);
      this.message.setValue('');
    }
  }
}

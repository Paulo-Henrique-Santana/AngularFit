import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-msg-erro-form-control',
  standalone: true,
  imports: [],
  templateUrl: './msg-erro-form-control.component.html',
  styleUrl: './msg-erro-form-control.component.scss',
})
export class MsgErroFormControlComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input() set erros(value: { [key: string]: string }) {
    this.errosMsgs = {
      ...this.errosMsgs,
      ...value
    }
  }

  errosMsgs = {
    required: 'Campo obrigatório',
  } as { [key: string]: string };

  get errorMessage() {
    if (
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    ) {
      for (const key in this.control.errors) {
        return this.errosMsgs[key];
      }
    }

    return null;
  }
}

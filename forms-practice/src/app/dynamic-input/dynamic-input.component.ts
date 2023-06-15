import { Component, Input } from '@angular/core';
import { InputBase } from './model/input-base';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.css'],
})
export class DynamicInputComponent {
  @Input()
  field!: InputBase<string | boolean>;

  @Input()
  form!: FormGroup;

  hasFieldError(): string {
    let error = '';

    if (
      this.form.get(this.field.key)!.getError('required') &&
      (this.form.get(this.field.key)!.dirty ||
        this.form.get(this.field.key)!.touched)
    ) {
      return `${this.field.label} is required`;
    } else if (
      this.form.get(this.field.key)!.invalid &&
      (this.form.get(this.field.key)!.dirty ||
        this.form.get(this.field.key)!.touched)
    ) {
      const controlErrors: ValidationErrors | null | undefined = this.form.get(
        this.field.key
      )?.errors;

      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (controlErrors[keyError] != null) {
            this.field.errorMsgs?.forEach((errorMsg) => {
              if (errorMsg.key === keyError) {
                error = errorMsg.msg;
              }
            });
          }
        });
      }
    }

    return error;
  }
}

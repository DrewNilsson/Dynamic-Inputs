import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextbox } from './dynamic-input/model/input-textbox';
import { InputDropdown } from './dynamic-input/model/input-dropdown';
import { InputRadio } from './dynamic-input/model/input-radio';
import { InputBase } from './dynamic-input/model/input-base';
import { InputDate } from './dynamic-input/model/input-date';
import { InputCheckbox } from './dynamic-input/model/input-checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form!: FormGroup;

  states: Array<Options> = [
    { key: 'az', value: 'AZ' },
    { key: 'ca', value: 'CA' },
    { key: 'co', value: 'CO' },
    { key: 'or', value: 'OR' },
    { key: 'ny', value: 'NY' },
    { key: 'nv', value: 'NV' },
    { key: 'sc', value: 'SC' },
    { key: 'tn', value: 'TN' },
    { key: 'tx', value: 'TX' },
    { key: 'wa', value: 'WA' },
  ];

  formFields: InputBase<string | boolean>[] = [
    new InputTextbox({
      key: 'fName',
      label: 'First Name',
      type: 'text',
      required: true,
      color: 'primary',
      clear: true,
    }),

    new InputTextbox({
      key: 'lName',
      label: 'Last Name',
      type: 'text',
      required: true,
      hint: 'This is textbox',
      placeholder: 'Nilsson',
    }),

    new InputDate({
      key: 'date',
      label: 'Date',
      type: 'date',
      color: 'accent',
      required: true,
    }),

    new InputTextbox({
      key: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validators: [Validators.email, Validators.minLength(5)],
      errorMsgs: [
        { key: 'email', msg: `Incorrect email format` },
        { key: 'minlength', msg: 'Too Short' },
      ],
    }),

    new InputTextbox({
      key: 'address',
      label: 'Address',
      type: 'text',
      required: true,
    }),

    new InputTextbox({
      key: 'city',
      label: 'City',
      type: 'text',
      required: true,
    }),

    new InputDropdown({
      key: 'state',
      label: 'State',
      options: this.states,
      required: true,
    }),

    new InputTextbox({
      key: 'zip',
      label: 'Zipcode',
      type: 'text',
      required: true,
      validators: [Validators.pattern(/^[0-9]{5}$/)],
      errorMsgs: [{ key: 'pattern', msg: 'Incorrect format' }],
    }),

    new InputTextbox({
      key: 'tel',
      label: 'Phone Number',
      type: 'text',
      required: true,
      validators: [
        Validators.pattern(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        ),
      ],
      errorMsgs: [{ key: 'pattern', msg: `Incorrect format` }],
    }),

    new InputRadio({
      key: 'favCereal',
      label: 'Favorite Cereal',
      options: [
        { key: 'frostedFlakes', value: 'Frosted Flakes' },
        { key: 'captCrunch', value: 'Captain Crunch' },
        { key: 'cornPops', value: 'Corn Pops' },
      ],
      required: true,
    }),

    new InputCheckbox({
      key: 'abc',
      label: 'I dont Know',
      color: 'primary',
      required: true,
    }),
  ];

  ngOnInit(): void {
    this.toFormGroup();
  }

  private toFormGroup(): void {
    const group: any = {};

    this.formFields.forEach((field) => {
      group[field.key] = field.required
        ? new FormControl(field.value || '', [
            ...(<[]>field.validators),
            Validators.required,
          ])
        : new FormControl(field.value || '', field.validators);
    });
    this.form = new FormGroup(group);
  }
}

export interface Options {
  key: string;
  value: string;
}

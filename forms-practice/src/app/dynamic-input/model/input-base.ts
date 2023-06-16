import { ValidatorFn } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

export class InputBase<T> {
  // Sets value of input on init
  value: T | undefined;

  // Used to Id input
  key: string;

  // Add label to input
  label: string;

  // Add placeholder to input
  placeholder: string;

  // Adds Validator.required to input
  required: boolean;

  // Specifies which input class to be used
  controlType: string;

  // Specifies which input type to be used
  type: string;

  // Adds Material hint to input
  hint: string;

  // Array of options for dropdowns and radio groups
  options: { key: string; value: string; disabled?: boolean }[];

  // Add array of validations to input field
  validators: ValidatorFn[] | null;

  // Add error messages corresponding to validator key
  errorMsgs: { key: string; msg: string }[] | null;

  // Adds a clear button to end of textbox or textarea
  clear: boolean;

  // Puts Input into disabled state
  disabled: boolean;

  // Dropdowns can have multiple options selected
  multiple: boolean;

  // Change color of input
  color: ThemePalette;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      placeholder?: string;
      required?: boolean;
      controlType?: string;
      type?: string;
      hint?: string;
      options?: { key: string; value: string; disabled?: boolean }[];
      validators?: ValidatorFn[] | null;
      errorMsgs?: { key: string; msg: string }[] | null;
      clear?: boolean;
      disabled?: boolean;
      multiple?: boolean;
      color?: ThemePalette;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.hint = options.hint || '';
    this.options = options.options || [];
    this.validators = options.validators || [];
    this.errorMsgs = options.errorMsgs || [];
    this.clear = options.clear || false;
    this.disabled = options.disabled || false;
    this.multiple = options.multiple || false;
    this.color = options.color || 'primary';
  }
}

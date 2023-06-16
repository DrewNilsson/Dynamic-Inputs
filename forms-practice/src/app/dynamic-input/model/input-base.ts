import { ValidatorFn } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

export class InputBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  hint: string;
  options: { key: string; value: string; disabled?: boolean; }[];
  validators: ValidatorFn[] | null;
  errorMsgs: { key: string; msg: string; }[] | null;
  clear: boolean;
  disabled: boolean;
  multiple: boolean;
  color: ThemePalette;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      placeholder?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      hint?: string;
      options?: { key: string; value: string; disabled?: boolean; }[];
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
    this.order = options.order === undefined ? 1 : options.order;
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

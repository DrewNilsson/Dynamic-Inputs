import { ValidatorFn } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

export class InputBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string; value: string }[];
  validators: ValidatorFn[] | null;
  errorMsgs: { key: string; msg: string }[] | null;
  color: ThemePalette;

  constructor(options: { value?: T });
}

import { InputBase } from './input-base';

export class InputDateRange extends InputBase<string> {
  override controlType = 'date-range';
}

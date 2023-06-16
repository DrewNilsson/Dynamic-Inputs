import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextbox } from './dynamic-input/model/input-textbox';
import { InputDropdown } from './dynamic-input/model/input-dropdown';
import { InputRadio } from './dynamic-input/model/input-radio';
import { InputBase } from './dynamic-input/model/input-base';
import { InputDate } from './dynamic-input/model/input-date';
import { InputCheckbox } from './dynamic-input/model/input-checkbox';
import { InputDateRange } from './dynamic-input/model/input-date-range';
import { InputTextarea } from './dynamic-input/model/input-textarea';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

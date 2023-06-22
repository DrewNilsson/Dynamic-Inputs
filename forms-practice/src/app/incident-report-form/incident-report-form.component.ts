import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputBase, Options } from '../dynamic-input/model/input-base';
import { InputTextbox } from '../dynamic-input/model/input-textbox';
import { InputDropdown } from '../dynamic-input/model/input-dropdown';
import { Observable, tap } from 'rxjs';
import { InputCheckbox } from '../dynamic-input/model/input-checkbox';
import { InputTextarea } from '../dynamic-input/model/input-textarea';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-incident-report-form',
  templateUrl: './incident-report-form.component.html',
  styleUrls: ['./incident-report-form.component.css'],
})
export class IncidentReportFormComponent {
  @Output()
  newValueEvent = new EventEmitter<any>();

  form!: FormGroup;

  private formFieldCountyValueChanges$!: Observable<any>;

  counties = [
    { key: 'San Joaquin County', value: 'San Joaquin County' },
    { key: 'Stanislaus County', value: 'Stanislaus County' },
  ];
  districts = [
    {
      key: 'Stockton Unified',
      countyKey: 'San Joaquin County',
      value: 'Stockton Unified',
    },
    {
      key: 'Ripon Unified',
      countyKey: 'San Joaquin County',
      value: 'Ripon Unified',
    },
    {
      key: 'Modesto Unified',
      countyKey: 'Stanislaus County',
      value: 'Modesto Unified',
    },
  ];
  schools = [
    {
      key: 'John Adams Elementary',
      districtKey: 'Stockton Unified',
      value: 'John Adams Elementary',
    },
    {
      key: 'Cesar Chavez High',
      districtKey: 'Stockton Unified',
      value: 'Cesar Chavez High',
    },
    { key: 'Ripon High', districtKey: 'Ripon Unified', value: 'Ripon High' },
    {
      key: 'Weston Elementary',
      districtKey: 'Ripon Unified',
      value: 'Weston Elementary',
    },
    {
      key: 'Ripon Elementary',
      districtKey: 'Ripon Unified',
      value: 'Ripon Elementary',
    },
    {
      key: 'Modesto High',
      districtKey: 'Modesto Unified',
      value: 'Modesto High',
    },
    {
      key: 'Bret Hart Elementary',
      districtKey: 'Modesto Unified',
      value: 'Bret Hart Elementary',
    },
  ];
  grades = [
    { key: 'Kn', value: 'Kindergarden' },
    { key: '1st', value: 'First Grade' },
    { key: '2nd', value: 'Second Grade' },
    { key: '3rd', value: 'Third Grade' },
    { key: '4th', value: 'Fourth Grade' },
    { key: '5th', value: 'Fifth Grade' },
    { key: '6th', value: 'Sixth Grade' },
    { key: '7th', value: 'Seventh Grade' },
    { key: '8th', value: 'Eighth Grade' },
    { key: '9th', value: 'Ninth Grade' },
    { key: '10th', value: 'Tenth Grade' },
    { key: '11th', value: 'Eleventh Grade' },
    { key: '12th', value: 'Twelfth Grade' },
  ];

  countyOptions: Options[] = this.counties;
  districtOptions: Options[] = [];
  schoolOptions: Options[] = [];

  formFields: InputBase<string | boolean>[] = [
    new InputTextbox({
      key: 'badgeId',
      label: 'Bade ID Number',
      type: 'text',
      required: true,
    }),

    new InputDropdown({
      key: 'department',
      label: 'Department',
      options: [
        { key: 'police', value: 'Police' },
        { key: 'paramedics', value: 'Paramedics' },
      ],
      required: true,
    }),

    new InputTextbox({
      key: 'fName',
      label: 'First Name',
      type: 'text',
      required: true,
    }),

    new InputTextbox({
      key: 'lName',
      label: 'Last Name',
      type: 'text',
      required: true,
    }),

    new InputDropdown({
      key: 'county',
      label: 'County of Residence',
      options: this.countyOptions,
      required: true,
    }),

    new InputDropdown({
      key: 'district',
      label: 'District of Residence',
      options: this.districtOptions,
      required: true,
    }),

    new InputDropdown({
      key: 'school',
      label: `Student's School`,
      options: this.schoolOptions,
      required: true,
    }),

    new InputDropdown({
      key: 'gradeLvl',
      label: 'Enter Grade Level',
      options: this.grades,
      required: true,
    }),

    new InputCheckbox({
      key: 'attemptedSuicide',
      label: 'Attempted Suicide',
    }),

    new InputCheckbox({
      key: 'trauma',
      label: 'Child Involved in Trauma',
    }),

    new InputCheckbox({
      key: 'suicideRelatedEmergency',
      label: 'Suicide Related Emergency',
    }),

    new InputTextarea({
      key: 'comment',
      label: 'Comment - optional',
      type: 'text',
    }),
  ];

  ngOnInit(): void {
    this.toFormGroup();

    this.formFieldCountyValueChanges$ = this.form
      .get('county')!
      .valueChanges.pipe(
        tap((_arrayDistricts) => {
          this.form.patchValue({ district: '' });
          return _arrayDistricts;
        })
      );
    this.formFieldCountyValueChanges$.subscribe();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;
    alert('Successfully Submitted');
    this.newValueEvent.emit(this.form.value);
    this.form.reset();
  }

  valueChanged(object: any) {
    if (object.key == 'county') {
      this.changeCounty(object.value);
    }
    if (object.key == 'district') {
      this.changeDistrict(object.value);
    }
  }

  changeCounty(countyKey: any) {
    this.formFields[5].options = [];
    this.formFields[6].options = [];
    this.districts.forEach((district) => {
      if (district.countyKey == countyKey) {
        // this.districtOptions.push({ key: district.key, value: district.value });
        this.formFields[5].options.push({
          key: district.key,
          value: district.value,
        });
      }
    });
  }

  changeDistrict(districtKey: any) {
    this.formFields[6].options = [];
    this.schools.forEach((school) => {
      if (school.districtKey == districtKey) {
        // this.schoolOptions.push({ key: school.key, value: school.value });
        this.formFields[6].options.push({
          key: school.key,
          value: school.value,
        });
      }
    });
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

    group['county'] = new FormControl('', [Validators.required]);
    group['district'] = new FormControl('', [Validators.required]);
    group['school'] = new FormControl('', [Validators.required]);
    this.form = new FormGroup(group);
  }
}

import { Component } from '@angular/core';
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
  form!: FormGroup;

  private formFieldCountyValueChanges$!: Observable<any>;

  counties = [
    { key: '1', value: 'San Joaquin County' },
    { key: '2', value: 'Stanislaus County' },
    { key: '3', value: 'Stanislaus County' },
  ];
  districts = [
    { key: '1', countyKey: '1', value: 'Stockton Unified' },
    { key: '2', countyKey: '1', value: 'Ripon Unified' },
    { key: '3', countyKey: '2', value: 'Modesto Unified' },
  ];
  schools = [
    { key: '1', districtKey: '1', value: 'John Adams Elementary' },
    { key: '2', districtKey: '1', value: 'Cesar Chavez High' },
    { key: '3', districtKey: '2', value: 'Ripon High' },
    { key: '4', districtKey: '2', value: 'Weston Elementary' },
    { key: '5', districtKey: '2', value: 'Ripon Elementary' },
    { key: '6', districtKey: '3', value: 'Modesto High' },
    { key: '7', districtKey: '3', value: 'Bret Hart Elementary' },
  ];
  grades = [
    { key: 'K', value: 'Kindergarden' },
    { key: '1', value: 'First Grade' },
    { key: '2', value: 'Second Grade' },
    { key: '3', value: 'Third Grade' },
    { key: '4', value: 'Fourth Grade' },
    { key: '5', value: 'Fifth Grade' },
    { key: '6', value: 'Sixth Grade' },
    { key: '7', value: 'Seventh Grade' },
    { key: '8', value: 'Eighth Grade' },
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
      label: 'Select or search for Department',
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

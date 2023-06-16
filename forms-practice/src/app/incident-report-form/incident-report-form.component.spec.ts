import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentReportFormComponent } from './incident-report-form.component';

describe('IncidentReportFormComponent', () => {
  let component: IncidentReportFormComponent;
  let fixture: ComponentFixture<IncidentReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentReportFormComponent]
    });
    fixture = TestBed.createComponent(IncidentReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

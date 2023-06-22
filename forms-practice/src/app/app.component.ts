import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  incidents: IncidentObject[] = [];

  addIncidentValue(newIncident: IncidentObject) {
    this.incidents.push(newIncident);
    console.log(this.incidents);
  }
}

export interface IncidentObject {
  badgeId: string;
  department: string;
  fName: string;
  lName: string;
  county: string;
  district: string;
  school: string;
  gradeLvl: string;
  attemptedSuicide: boolean;
  trauma: boolean;
  suicideRelatedEmergency: boolean;
  comment: string;
}

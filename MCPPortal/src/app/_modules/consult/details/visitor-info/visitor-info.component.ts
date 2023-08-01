import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-visitor-info',
  templateUrl: './visitor-info.component.html',
})
export class VisitorInfoComponent implements OnInit {
  @Input() visitDate: Date;
  @Input() activityExecution: string;
  @Input() expert: string;
  @Input() reportingForm: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}

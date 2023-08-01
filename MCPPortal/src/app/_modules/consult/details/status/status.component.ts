import {Component, Input, OnInit} from '@angular/core';
import {StepperStep} from '@progress/kendo-angular-layout';
import {Status} from '../../../../_models';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  @Input() currentStatusIndex: number;
  statuses: StepperStep[] = [
    {label: Status.New, disabled: true, icon: 'clipboard'},
    {label: Status.ToPlan, disabled: true, icon: 'clipboard-text'},
    {label: Status.Planned, disabled: true, icon: 'calendar'},
    {label: Status.Handling, disabled: true, icon: 'track-changes-accept-all'},
    {label: Status.Closed, disabled: true, icon: 'validation-data'},
    {label: Status.Cancelled, disabled: true, icon: 'trash'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

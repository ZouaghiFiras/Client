import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
})
export class PolicyComponent implements OnInit {
  @Input() policyNumber: string;
  @Input() assignmentNumber: string;
  @Input() insuredAmount: number;
  @Input() ownRisk: number;
  @Input() policyConditions: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}

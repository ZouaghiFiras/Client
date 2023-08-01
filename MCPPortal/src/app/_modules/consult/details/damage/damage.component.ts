import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-damage',
  templateUrl: './damage.component.html',
})
export class DamageComponent implements OnInit {
  @Input() damageNumber: string;
  @Input() damageDate: Date;
  @Input() estimatedDamageAmount: number;
  @Input() cause: string;
  @Input() recovery = false;
  @Input() deedOfAssignment: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}

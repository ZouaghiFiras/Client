import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-stepper',
  templateUrl: './menu-stepper.component.html',
  styleUrls: ['./menu-stepper.component.scss'],
})
export class MenuStepperComponent implements OnInit {
  menus = [
    {
      menuTitle: 'MenuStepper.Organizations',
      steps: [
        {
          stepTitle: 'MenuStepper.New entry',
          stepIcon: 'k-icon k-i-file-add',
          stepRouterLink: '/new-entry'
        },
        {
          stepTitle: 'MenuStepper.Overview',
          stepIcon: 'k-i-zoom k-i-search',
          stepRouterLink: '/organization'
        }
      ]
    },
    {
      menuTitle: 'MenuStepper.Configuration',
      steps: [
        {
          stepTitle: 'MenuStepper.Datatables',
          stepIcon: 'k-icon k-i-table-properties',
          stepRouterLink: '/settings'
        }
      ]
    },

    {
      menuTitle: 'MenuStepper.Contracts',
      steps: [
        {
          stepTitle: 'MenuStepper.Contracts',
          stepIcon: 'k-icon k-i-folder',
          stepRouterLink: '/contract'
        },
        {
          stepTitle: 'MenuStepper.Contract Settings',
          stepIcon: 'k-icon k-i-gear',
          stepRouterLink: '/contract settings'
        }
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {

  }
}

// Angular
import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public shown = true;
  public screen: string;
  destroySubject$: Subject<void> = new Subject();

  constructor() {
  }

  ngOnInit() {
  }

  getScreenShow($event: { show: boolean, screen: string }) {
    this.shown = $event.show;
    this.screen = $event.screen;
  }
}

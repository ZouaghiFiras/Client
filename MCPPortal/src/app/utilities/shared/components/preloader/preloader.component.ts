// Angular
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styles: []
})
export class PreloaderComponent implements OnInit, OnDestroy {
  @Input() public fullscreen = false;

  public parentWidth: number = null;
  public parentHeight: number = null;

  constructor() {
  }


  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

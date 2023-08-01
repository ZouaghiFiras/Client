import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-small-header-menu',
  templateUrl: './small-header-menu.component.html',
  styleUrls: ['./small-header-menu.component.scss']
})
export class SmallHeaderMenuComponent implements OnInit {

  @Input() returnUrl: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onExitClick() {
    this.router.navigate([this.returnUrl]);
  }

}

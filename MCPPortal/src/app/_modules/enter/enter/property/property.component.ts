import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
})
export class PropertyComponent implements OnInit {

  title = 'property';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['enter/property/reporter_selection']).then();
  }
}

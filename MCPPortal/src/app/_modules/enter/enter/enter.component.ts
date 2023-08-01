import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit{
  title = 'embrace-power';

  constructor(private router: Router) {}

  ngOnInit() {
    // this.router.navigate(['enter/reporter_selection']);
  }

}

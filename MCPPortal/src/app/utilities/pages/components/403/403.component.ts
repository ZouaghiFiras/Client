/**
 * Importing Angular component
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

/**
 * component in 401 html file
 */
@Component({
  templateUrl: '403.component.html'
})
/**
 * class name P403Component
 */
export class P403Component {
  /**
   * The constructor is empty
   */
  constructor(private route: Router,) {
  }

  /**
   * redirect to dashboard
   */
  redirect() {
    this.route.navigate(['/dashboard/']);
  }
}

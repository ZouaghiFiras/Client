/**
 * Importing Angular component
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

/**
 * component in 401 html file
 */
@Component({
  templateUrl: '401.component.html'
})
/**
 * class name P401Component
 */
export class P401Component {
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

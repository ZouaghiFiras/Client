import {Component, OnInit} from '@angular/core';
import {MsalService} from '@azure/msal-angular';

/**
 * Component for displaying the application bar.
 */
@Component({
  selector: 'app-bar',
  templateUrl: './app-nav-bar.component.html',
})
export class AppNavBarComponent implements OnInit {
  /**
   * Creates an instance of AppNavBarComponent.
   * @param authService The authentication service for managing user authentication.
   */
  constructor(public authService: MsalService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
  }
}

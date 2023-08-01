import {Component, OnInit} from '@angular/core';
import {AuthenticationResult, EventMessage, EventType, InteractionStatus} from '@azure/msal-browser';
import {MsalBroadcastService, MsalService} from '@azure/msal-angular';
import {filter} from 'rxjs/operators';
import {createClaimsTable, ThemeService} from '../../../_helpers';
import {Router} from '@angular/router';

interface MenuItem {
  text: string;
  icon: string;
}

/**
 * Component for displaying and managing the user's profile.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  loginDisplay = false;
  public menuItems: MenuItem[] = [
    {text: 'Edit Profile', icon: 'k-i-settings'},
    // {text: 'Dark Mode Off', icon: 'k-i-clear-css'},
    // {text: 'Dark Mode On', icon: 'k-i-apply-format'},
    // {text: 'OS Theme', icon: 'k-i-strip-font-elements'},
    {text: 'Logout', icon: 'k-i-logout'},
  ];
  public selectedMenuItem = null;
  public avatarUrl = '../assets/img/avatars/user-male.png';
  public isLoading = false;
  dataSource: any = [];
  username?: string;

  /**
   * Creates an instance of ProfileComponent.
   * @param authService The authentication service for managing user authentication.
   * @param msalBroadcastService The service for subscribing to MSAL events.
   * @param router The router service for navigation.
   * @param themeService The service for managing dark mode.
   */
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private themeService: ThemeService
  ) {
    const activeAccount = this.authService.instance.getActiveAccount();
    if (activeAccount) {
      this.username = activeAccount.username.split('@')[0];
      this.menuItems.push({ text: this.username, icon: 'k-i-user' });
    }
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.msalBroadcastService
      .msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
    this.msalBroadcastService
      .inProgress$
      .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(() => {
        this.setLoginDisplay();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims);
      });
  }

  /**
   * Sets the login display based on the number of accounts.
   */
  setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  /**
   * Retrieves the user claims and populates the data source for display.
   * @param claims The user claims obtained from the idToken.
   */
  getClaims(claims: any): void {
    if (claims) {
      const claimsTable = createClaimsTable(claims);
      this.dataSource = [...claimsTable];
    }
  }

  /**
   * Handles the selection of a menu item.
   * @param item The selected menu item.
   */
  public onSelect(item: MenuItem): void {
    switch (item.text) {
      case 'Edit Profile' :
        console.log('Profile selected');
        if (this.authService.instance.getActiveAccount()) {
          this.router.navigateByUrl('/profile').then();
        }
        break;
      case 'Settings' :
        console.log('Settings selected');
        if (this.authService.instance.getActiveAccount()) {
          this.router.navigateByUrl('/admin').then();
        }
        break;
      case 'Dark Mode Off' :
        console.log('Dark Mode On/Off selected');
        this.setLightModeTheme();
        break;
      case 'Dark Mode On' :
        console.log('Dark Mode On/Off selected');
        this.setDarkModeTheme();
        break;
      case 'OS Theme' :
        console.log('Dark Mode On/Off selected');
        this.setSystemModeTheme();
        break;
      case 'Logout' :
        this.authService.logout();
        break;
      default:
        console.log('Invalid selection');
    }
  }
  setDarkModeTheme(): void {
    this.themeService.setDarkMode();
  }

  setLightModeTheme(): void {
    this.themeService.setLightMode();
  }
  setSystemModeTheme(): void {
    this.themeService.setSystemMode();
  }
}

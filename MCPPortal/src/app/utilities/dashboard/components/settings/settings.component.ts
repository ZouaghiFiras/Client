// Angular
import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AuthenticationService, AuthToken, UserProfile} from '../../../shared';

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit, AfterContentInit {
  public bearerToken = '';
  public profile: UserProfile;
  public profileRoles: any;
  public authtoken: AuthToken = new AuthToken();

  public searchText: string;

  constructor(
    // private authService: AuthService,
    private authenticationService: AuthenticationService,
  ) {
    // this.bearerToken = authService.getToken();
  }

  ngAfterContentInit() {
  }

  ngOnInit() {
    this.profile = new UserProfile();

    // roles op
    this.authenticationService.getProfileRoles().then(data => {
      this.profileRoles = data;
    });
  }
}

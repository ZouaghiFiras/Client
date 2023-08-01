// import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';

export class UserProfile {
  public uniqueName = '';
  public emailAddress = '';
  public fullName = '';
  public familyName = '';
  public givenName = '';
  public ipAddress = '';
  public Roles: any;

  constructor(
    /**
     * The JWT service to get the token when authenticating
     */
    // jwtHelper: JwtHelperService = new JwtHelperService()
  ) {
    /**
     * Getting the token
     */
    const userProfile = localStorage.getItem(environment.TokenName);
    const token = (userProfile == null) ? null : JSON.parse(userProfile).token;
    /**
     * For decoding the Token with the hole user information : unique name, email Address, full Name ...
     */
    // if (token) {
    //   const decodedToken = jwtHelper.decodeToken(token);
    //
    //   this.uniqueName = decodedToken.unique_name;
    //   this.emailAddress = decodedToken.upn;
    //   this.fullName = decodedToken.name;
    //   this.familyName = decodedToken.family_name;
    //   this.givenName = decodedToken.given_name;
    //   this.ipAddress = decodedToken.ipaddr;
    //   this.Roles = decodedToken.role;
    // }
  }
}

// import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';

export class AuthToken {
  public aud = '';
  public ver = '';
  public ipAddress = '';

  constructor(
    // jwtHelper: JwtHelperService = new JwtHelperService()
  ) {
    const userProfile = localStorage.getItem(environment.TokenName);
    const token = (userProfile == null) ? null : JSON.parse(userProfile).token;
    // const decodedToken = jwtHelper.decodeToken(token);
    // this.aud = decodedToken.aud;
    // this.ver = decodedToken.ver;
    // this.ipAddress = decodedToken.ipaddr;
  }
}

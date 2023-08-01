import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private msalService: MsalService) { }

  async getToken(): Promise<string> {
    const account = this.msalService.instance.getActiveAccount();
    return await this.msalService.instance
      .acquireTokenSilent({
        account,
        scopes: ['https://clientportalmcp.onmicrosoft.com/mcp/api/assignments.read', 'https://clientportalmcp.onmicrosoft.com/mcp/api/assignmentdetails.write', 'https://clientportalmcp.onmicrosoft.com/mcp/api/contact.write'],
      })
      .then((response) => response.accessToken);
  }

  async getDecodedToken(): Promise<any> {
    const token = this.getToken();
    return token ? jwtDecode(await token) : null;
  }
}

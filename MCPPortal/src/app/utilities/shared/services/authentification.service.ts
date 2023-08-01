import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, publishReplay, refCount} from 'rxjs/operators';
// import { AuthService } from './auth.service';
import {environment} from 'src/environments/environment';
import {EmployeeAuthorizations} from '../models/employee-authorazation.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
/**
 * InsuranceClaimFormModel name Authentication service
 */
export class AuthenticationService {
  public currentUser: Observable<User>;
  public roles$: Observable<any>;
  /**
   * The Bearer Token initialisation to empty
   */
  private bearerToken = '';
  /**
   * For getting the current user
   */
  private currentUserSubject: BehaviorSubject<User>;
  private token = '';

  /**
   * Constructor
   */
  constructor(
    private httpClient: HttpClient,
    // private authService: AuthService
  ) {
  }

  /**
   * To get current user values when he try to authenticate
   */
  public get currentUserValue(): User {
    this.token = localStorage.getItem(environment.TokenName);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.token));
    this.currentUser = this.currentUserSubject.asObservable();

    return this.currentUserSubject.value;
  }

  /**
   * To create authorization by having the Bearer token
   */
  public createAuthorizationHeader(headers: Headers) {
    // this.bearerToken = this.authService.getToken();

    headers.append('Authorization', 'Bearer ' + this.bearerToken);
  }

  /**
   * For getting the profile role after authorization
   */
  public getProfileRoles(token = null): Promise<any> {
    // this.bearerToken = token != null ? token : this.authService.getToken();
    const BASE_URL = environment.ServiceAuthURL;
    const sUrl = `${BASE_URL}roles`;

    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + this.bearerToken);
    /**
     * Getting response
     */
    return this.httpClient
      .get(sUrl, {headers})
      .toPromise()
      .then(response => {
        return response || {};
      });
  }

  /**
   * To get roles
   */
  public getRoles(): Observable<any> {
    // this.bearerToken = this.authService.getToken();
    const BASE_URL = environment.ServiceAuthURL;
    const sUrl = `${BASE_URL}roles`;

    // this.bearerToken = this.authService.getToken();

    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + this.bearerToken);

    if (!this.roles$) {
      this.roles$ = this.httpClient
        .get(sUrl, {headers})
        .pipe(
          map(data => data),
          publishReplay(1),
          refCount()
        );
    }

    return this.roles$;
  }

  /**
   * For logging out when we call the logout(); here we will remove the token
   */
  public logout() {
    localStorage.removeItem(environment.TokenName);
    this.currentUserSubject.next(null);
  }

  public getEmployeeAuthorizations(token = null) {
    const BASE_URL = environment.ServiceAuthURL;
    const sUrl = `${BASE_URL}employeeauthorizations`;

    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + token);
    /**
     * Getting response
     */
    return this.httpClient
      .get<string>(sUrl, {headers})
      .pipe(map(x => new EmployeeAuthorizations(x)));
  }

  public getSelectedRole(role) {
    const BASE_URL = environment.ServiceAuthURL;
    return this.httpClient
      .get<any>(BASE_URL + 'odata/authorizationinheritance/?$filter=AuthorizationGroupRoleId eq \''
        + role
        + '\' and (OperationCreate eq true or OperationRead eq true or OperationUpdate eq true or OperationDelete eq true or OperationExecute eq true) eq true');
  }
}

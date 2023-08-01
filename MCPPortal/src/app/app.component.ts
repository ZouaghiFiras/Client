import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AyncLocalStorageHelper, CustomTranslateService, PreloaderService} from './utilities/shared';
import {TranslateService} from '@ngx-translate/core';
import {Theme} from './utilities/layout';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {filter, takeUntil} from 'rxjs/operators';
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  InteractionType,
  PopupRequest,
  RedirectRequest,
  SsoSilentRequest
} from '@azure/msal-browser';
import {b2cPolicies, createClaimsTable} from './_helpers';
import {IdTokenClaims, PromptValue} from '@azure/msal-common';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';


type IdTokenClaimsWithPolicyId = IdTokenClaims & {
  acr?: string,
  tfp?: string,
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoading = false;
  dataSource: any = [];
  isIframe = false;
  loginDisplay = false;
  // tslint:disable-next-line:variable-name
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    public authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    public router: Router,
    private preloaderService: PreloaderService,
    private translateService: TranslateService,
    private customTranslateService: CustomTranslateService,
  ) {
  }

  ngOnInit(): void {
    this.initializeLanguage(); // Initialize the language for translation
    this.checkIframe(); // Check if the application is running in an iframe
    this.enableAccountStorageEvents(); // Enable account storage events
    this.subscribeToMsalEvents(); // Subscribe to MSAL events
    this.subscribeToMsalInprogressEvents(); // Subscribe to MSAL in-progress events
    this.subscribeToMsalSuccessEvents(); // Subscribe to MSAL success events
    this.subscribeToMsalFailureEvents(); // Subscribe to MSAL failure events
    this.setActiveAccountIfNeeded(); // Set active account if needed
    this.redirectToLoginIfNoActiveAccount(); // Redirect to login if no active account
    this.subscribeToPreloaderChanges(); // Subscribe to preloader changes
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  /**
   * Initialize the language for translation
   */
  private initializeLanguage(): void {
    const browserLang = this.translateService.getBrowserLang();
    const supportedLanguage = ['en-GB', 'nl-NL'];

    AyncLocalStorageHelper.getItem<Theme>('theme').then(data => {
      if (data && data.language) {
        this.translateService.setDefaultLang(data.language);
      } else {
        const defaultLang = supportedLanguage.indexOf(browserLang) !== -1 ? browserLang : 'en-GB';
        this.translateService.setDefaultLang(defaultLang);
      }

      setTimeout(() => {
        this.customTranslateService.setLocal(this.translateService.getDefaultLang());
      }, 500);
    });
  }

  /**
   * Subscribe to preloader changes
   */
  private subscribeToPreloaderChanges(): void {
    setTimeout(() => {
      this.preloaderService.changeEmitted$.subscribe(data => {
        if (data && data.action === 'preloader') {
          this.isLoading = data.value;
        }
      });
    }, 500);
  }

  /**
   * Check if the application is running in an iframe
   */
  private checkIframe(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();
  }

  /**
   * Enable account storage events
   */
  private enableAccountStorageEvents(): void {
    this.authService.instance.enableAccountStorageEvents();
  }

  /**
   * Subscribe to MSAL events related to account changes
   */
  private subscribeToMsalEvents(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED))
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

  }

  /**
   * Subscribe to MSAL in-progress events
   */
  private subscribeToMsalInprogressEvents(): void {
    this.msalBroadcastService.inProgress$
      .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None), takeUntil(this._destroying$))
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  /**
   * Subscribe to MSAL success events
   */
  private subscribeToMsalSuccessEvents(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
          || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
          || msg.eventType === EventType.SSO_SILENT_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        const idtoken = payload.idTokenClaims as IdTokenClaimsWithPolicyId;

        // Set active account for sign-up/sign-in policy
        if (idtoken.acr === b2cPolicies.names.signUpSignIn || idtoken.tfp === b2cPolicies.names.signUpSignIn) {
          this.authService.instance.setActiveAccount(payload.account);
        }

        // Handle edit profile policy
        if (idtoken.acr === b2cPolicies.names.editProfile || idtoken.tfp === b2cPolicies.names.editProfile) {
          const originalSignInAccount = this.getOriginalSignInAccount(idtoken);
          const signUpSignInFlowRequest: SsoSilentRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            account: originalSignInAccount
          };

          this.authService.ssoSilent(signUpSignInFlowRequest);
        }

        // Handle reset password policy
        if (idtoken.acr === b2cPolicies.names.resetPassword || idtoken.tfp === b2cPolicies.names.resetPassword) {
          const signUpSignInFlowRequest: RedirectRequest | PopupRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            prompt: PromptValue.LOGIN,
            scopes: []
          };

          this.login(signUpSignInFlowRequest);
        }

        return result;
      });
  }

  /**
   * Subscribe to MSAL failure events
   */
  private subscribeToMsalFailureEvents(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE || msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        if (result.error && result.error.message.indexOf('AADB2C90118') > -1) {
          const resetPasswordFlowRequest: RedirectRequest | PopupRequest = {
            authority: b2cPolicies.authorities.resetPassword.authority,
            scopes: [],
          };

          this.login(resetPasswordFlowRequest);
        }
      });
  }

  /**
   * Get the original sign-in account for the given ID token claims
   * @param idTokenClaims - ID token claims
   * @returns The original sign-in account
   */
  private getOriginalSignInAccount(idTokenClaims: IdTokenClaimsWithPolicyId): AccountInfo | undefined {
    const accounts = this.authService.instance.getAllAccounts();

    // Find the account with matching policy ID
    for (const account of accounts) {
      const accountClaims = account.idTokenClaims as IdTokenClaimsWithPolicyId;
      if (accountClaims.acr === idTokenClaims.acr && accountClaims.tfp === idTokenClaims.tfp) {
        return account;
      }
    }

    return undefined;
  }

  /**
   * Subscribe to MSAL account events
   */
  private subscribeToMsalAccountEvents(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
  }

  /**
   * Subscribe to MSAL in-progress events
   */
  private subscribeToMsalInProgressEvents(): void {
    this.msalBroadcastService.inProgress$
      .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(() => {
        this.setLoginDisplay();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims);
      });
  }

  /**
   * Perform auto-login redirect
   */
  private autoLoginRedirect(): void {
    if (!this.authService.instance.getActiveAccount()) {
      this.authService.loginRedirect();
    }
  }

  /**
   * Get claims from ID token
   * @param claims - ID token claims
   */
  private getClaims(claims: any): void {
    if (claims) {
      const claimsTable = createClaimsTable(claims);
      this.dataSource = [...claimsTable];
    }
  }

  /**
   * Set the login display based on the number of accounts
   */
  private setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  /**
   * Check and set the active account if needed
   */
  private checkAndSetActiveAccount(): void {
    const activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  /**
   * Perform login based on the interaction type
   * @param userFlowRequest - User flow request
   */
  private login(userFlowRequest?: RedirectRequest | PopupRequest): void {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({...this.msalGuardConfig.authRequest, ...userFlowRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  /**
   * Perform logout
   */
  private logout(): void {
    this.authService.logout();
  }

  /**
   * Initiate reset password flow
   */
  private resetPassword(): void {
    const resetPasswordFlowRequest: RedirectRequest | PopupRequest = {
      authority: b2cPolicies.authorities.resetPassword.authority,
      scopes: [],
    };

    this.login(resetPasswordFlowRequest);
  }

  /**
   * Initiate edit profile flow
   */
  private editProfile(): void {
    const editProfileFlowRequest: RedirectRequest | PopupRequest = {
      authority: b2cPolicies.authorities.editProfile.authority,
      scopes: [],
    };

    this.login(editProfileFlowRequest);
  }

  /**
   * Set active account if needed
   */
  private setActiveAccountIfNeeded(): void {
    const activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  /**
   * Redirect to login if no active account
   */
  private redirectToLoginIfNoActiveAccount(): void {
    if (!this.authService.instance.getActiveAccount()) {
      this.authService.loginRedirect();
    }
  }
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Register locale data
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Kendo UI for Angular modules
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {ColumnResizingService, ExcelModule, GroupModule, PDFModule, RowFilterModule} from '@progress/kendo-angular-grid';
import {DialogModule, DialogsModule} from '@progress/kendo-angular-dialog';
import {LabelModule} from '@progress/kendo-angular-label';
import {AvatarModule, CardModule} from '@progress/kendo-angular-layout';
import {AppBarModule, NavigationModule} from '@progress/kendo-angular-navigation';
import {NotificationModule} from '@progress/kendo-angular-notification';

import {FileSelectModule} from '@progress/kendo-angular-upload';

// Kendo UI for Angular IntlService
import {CldrIntlService, IntlService} from '@progress/kendo-angular-intl';

// MSAL (Microsoft Authentication Library) modules
import {InteractionType, IPublicClientApplication, PublicClientApplication} from '@azure/msal-browser';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalModule,
  MsalRedirectComponent,
  MsalService
} from '@azure/msal-angular';

// Custom modules
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './utilities/shared/shared.module';
// Custom components
import {
  AppNavBarComponent,
  DescriptionComponent, HomeComponent,
  LanguageComponent,
  ProfileComponent,
  ProfileDetailsComponent
} from './_components';

import {DarkModeToggleComponent} from './utilities/dark-mode-toggle/dark-mode-toggle.component';
// Custom services
import {CustomTranslateService, ErrorInterceptor, PreloaderInterceptor, SharedService} from 'src/app/utilities/shared';

// Locale data
import localeNl from '@angular/common/locales/nl';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import '@progress/kendo-angular-intl/locales/de/all';
import '@progress/kendo-angular-intl/locales/fr/all';
import '@progress/kendo-angular-intl/locales/en/all';
import '@progress/kendo-angular-intl/locales/nl/all';
// MSAL configuration
import {loginRequest, msalConfig} from './_helpers';
import {AppComponent} from './app.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {AngularBotModule} from './_modules/angular-bot/angular-bot.module';
import {ConsultModule} from './_modules/consult/consult.module';
import { FooterComponent } from './_components';
import 'hammerjs';
import {ChartsModule, CollectionService} from '@progress/kendo-angular-charts';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeFr, 'fr-FR');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeEn, 'en-GB');
registerLocaleData(localeEn, 'en-US');
registerLocaleData(localeNl, 'nl');
registerLocaleData(localeNl, 'nl-NL');
registerLocaleData(localeNl, 'de');
registerLocaleData(localeNl, 'de-DE');


// Factory functions
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}

// TranslateLoader factory function
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  bootstrap: [AppComponent, MsalRedirectComponent],
  declarations: [
    AppComponent,
    AppNavBarComponent,
    ProfileComponent,
    LanguageComponent,
    HomeComponent,
    DescriptionComponent,
    ProfileDetailsComponent,
    DarkModeToggleComponent
,
    FooterComponent  ],
  exports: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    AngularBotModule,
    ConsultModule,
    SharedModule,
    // Kendo UI for Angular modules
    ChartsModule,
    DialogModule,
    CardModule,
    DropDownListModule,
    InputsModule,
    AvatarModule,
    AppBarModule,
    NavigationModule,
    GroupModule,
    ExcelModule,
    PDFModule,
    DialogsModule,
    RowFilterModule,
    FileSelectModule,
    NotificationModule,
    ButtonsModule,
    LabelModule,
    MsalModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [
    CollectionService,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    // Other services
    TranslateService,
    SharedService,
    CustomTranslateService,
    ColumnResizingService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: IntlService,
      useClass: CldrIntlService,
    },
    {
      provide: SharedService, // Example: Registering a custom service
      useClass: SharedService,
    },
    {
      provide: ErrorInterceptor,
      useClass: ErrorInterceptor,
    },
    {
      provide: PreloaderInterceptor,
      useClass: PreloaderInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi: true,
    },
  ]
})
export class AppModule {
  constructor(
    private customTranslateService: CustomTranslateService,
    private intl: IntlService,
  ) {
    setTimeout(() => {
      const int = this.intl as CldrIntlService;
      int.localeId = this.customTranslateService.getLanguageConverted();
      this.customTranslateService.setLocal(int.localeId);
    }, 500);
  }
}



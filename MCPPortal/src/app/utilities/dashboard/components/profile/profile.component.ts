// Angular
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CldrIntlService, IntlService} from '@progress/kendo-angular-intl';
import {environment} from 'src/environments/environment';
import {EntryService, Theme, ThemeService} from '../../../layout';
import {AuthToken, AyncLocalStorageHelper, CustomTranslateService, LocalizationService, UserProfile} from '../../../shared';

@Component({
  templateUrl: 'profile.component.html',
  providers: [
    EntryService,
  ]
})
export class ProfileComponent implements OnInit {
  public environment = environment;

  public bearerToken = '';

  public profile: UserProfile = new UserProfile();
  public authtoken: AuthToken = new AuthToken();

  public themeData: Theme = new Theme();
  public activeTheme = 'blueThemeProps';

  public languageData = [];

  constructor(
    private entryService: EntryService,
    private themeService: ThemeService,
    private localizationService: LocalizationService,
    public translate: TranslateService,
    private intl: IntlService,
    private customTranslateService: CustomTranslateService
  ) {
    // const authService: AuthService = new AuthService();
    // this.bearerToken = authService.getToken();
    // .then(data => {
    //   if (data) {
    //     this.themeData = data;
    //   } else {
    //     AyncLocalStorageHelper.setItem('theme', this.themeData);
    //   }
    // });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public changeLangage(language: string): void {
    if (language) {
      this.translate.setDefaultLang(language);
    }
    this.themeData.language = language;
    this.saveSettings();
    const int = this.intl as CldrIntlService;
    int.localeId = this.customTranslateService.getIntlLanguageConverted(language);
    this.customTranslateService.setLocal(int.localeId);
  }

  public toggleTheme(theme: string) {
    this.themeService.setActiveTheme(theme);

    this.themeData.themeProps = theme;

    this.saveSettings();
  }

  public breadcrumbsThemeChange(e): void {
    this.themeData.showBreadCrumbs = e.target.checked;

    this.saveSettings();
  }

  public pdfPreviewThemeChange(e): void {
    this.themeData.showPDFPreview = e.target.checked;

    this.saveSettings();
  }

  public getLanguages() {
    this.localizationService.getCultureCodes().subscribe(data => {
      this.languageData = data;
    }, error => console.log(error));
  }

  private saveSettings(): void {
    AyncLocalStorageHelper.setItem('theme', this.themeData)
      .then(res => {
        console.log('ProfileComponent: Theme > localforage.setItem: ' + res);

        this.entryService.executeCommand({action: 'ThemeChange', value: this.themeData});
      });
  }


}

function then(arg0: (data: any) => void) {
  throw new Error('Function not implemented.');
}


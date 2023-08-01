import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AyncLocalStorageHelper, CustomTranslateService} from '../../../utilities/shared';
import {Theme} from '../../../utilities/layout';

export interface ILanguage {
  id: number;
  title: string;
  name: string;
  image: string;
}

const languages: ILanguage[] = [
  {
    id: 1,
    title: 'nl-BE',
    name: 'Flemish',
    image: '../assets/img/languages/Belguim.png'
  },
  {
    id: 2,
    title: 'nl-NL',
    name: 'Dutch',
    image: '../assets/img/languages/Netherlands.png'
  },
  {
    id: 3,
    title: 'en-GB',
    name: 'English',
    image: '../assets/img/languages/GrandeBretagne.png'
  },
  {
    id: 4,
    title: 'fr-FR',
    name: 'French',
    image: '../assets/img/languages/France.png'
  },
  {
    id: 5,
    title: 'de-DE',
    name: 'German',
    image: '../assets/img/languages/Germany.png'
  },
  {
    id: 6,
    title: 'es-ES',
    name: 'Spanish',
    image: '../assets/img/languages/Spain.png'
  },
];

/**
 * Component for managing language selection and localization.
 */
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
})
export class LanguageComponent implements OnInit {
  public languages: ILanguage[] = languages;
  public selectedLanguage: ILanguage = this.languages[2];

  /**
   * Creates an instance of LanguageComponent.
   * @param languageService The translation service for managing language localization.
   * @param customTranslateService The custom translation service for managing language localization.
   */
  constructor(private languageService: TranslateService, private customTranslateService: CustomTranslateService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.initializeLanguage();
// Set the default language
    this.languageService.setDefaultLang(this.selectedLanguage.title);
  }

  /**
   * Switches the current language.
   */
  switchLanguage(): void {
    this.languageService.use(this.selectedLanguage.title);
  }

  private initializeLanguage(): void {
    const browserLang = this.languageService.getBrowserLang();
    const supportedLanguage = ['en-GB', 'nl-NL'];

    AyncLocalStorageHelper.getItem<Theme>('theme').then(data => {
      if (data && data.language) {
        this.languageService.setDefaultLang(data.language);
      } else {
        const defaultLang = supportedLanguage.indexOf(browserLang) !== -1 ? browserLang : 'en-GB';
        this.languageService.setDefaultLang(defaultLang);
      }

      setTimeout(() => {
        this.customTranslateService.setLocal(this.languageService.getDefaultLang());
      }, 500);
    });
  }

}

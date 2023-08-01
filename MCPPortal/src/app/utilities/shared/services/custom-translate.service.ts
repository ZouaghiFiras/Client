import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  local: string = this.translateService.getDefaultLang() || 'en';

  constructor(private translateService: TranslateService) {
  }

  setLocal(lang: string): void {
    this.local = lang;
  }

  getLocal(): string {
    return this.local;
  }

  getLanguageConverted(): string {
    const language = this.translateService.getDefaultLang();
    return this.getIntlLanguageConverted(language);
  }


  getIntlLanguageConverted(language) {
    switch (language) {
      case 'nl-NL': {
        return 'nl-NL';
      }
      case 'en-GB': {
        return 'en-US';
      }
      case 'fr-FR': {
        return 'fr-FR';
      }
      case 'de-DE': {
        return 'de-DE';
      }
      default: {
        return 'nl-NL';
      }
    }
  }
}

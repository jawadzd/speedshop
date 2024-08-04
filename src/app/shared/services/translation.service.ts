import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private storageKey = 'app_language';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr', 'ru']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem(this.storageKey);
    const browserLang = this.translate.getBrowserLang() ?? 'en';
    const langToUse = savedLang || (browserLang.match(/en|fr|ru/) ? browserLang : 'en');
    this.translate.use(langToUse);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(this.storageKey, lang); // Save the selected language
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}

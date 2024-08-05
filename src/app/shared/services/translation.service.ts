import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languageChange$ = new Subject<string>();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang() ?? 'en';
    const initialLang = browserLang.match(/en|fr|ru/) ? browserLang : 'en';
    console.log(`Initial language detected: ${browserLang}, using: ${initialLang}`);
    this.translate.use(initialLang);
  }

  changeLanguage(lang: string): void {
    if (lang && this.translate.getLangs().includes(lang)) {
      console.log(`Changing language to: ${lang}`);
      this.translate.use(lang);
      this.languageChange$.next(lang); // Notify subscribers about language change
    } else {
      console.warn(`Attempted to change to unsupported language: ${lang}`);
    }
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }

  get languageChanges() {
    return this.languageChange$.asObservable();
  }
}

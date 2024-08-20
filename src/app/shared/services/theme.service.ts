import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private lightThemeClass = 'light-theme';
  private darkThemeClass = 'dark-theme';

  constructor() {
    const savedTheme = localStorage.getItem('theme') || this.lightThemeClass;
    this.setTheme(savedTheme);
  }

  toggleTheme(isLightTheme: boolean): void {
    const theme = isLightTheme ? this.lightThemeClass : this.darkThemeClass;
    this.setTheme(theme);
  }

  private setTheme(theme: string): void {
    document.body.classList.remove(this.lightThemeClass, this.darkThemeClass);
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }
}

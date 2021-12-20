import { Component, OnInit } from '@angular/core';
import { ThemeEnum } from './enums/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  /**
   * Current app theme
   */
  currentTheme: ThemeEnum;

  /**
   * Body element selector
   */
  body = document.getElementsByTagName('body')[0];

  /**
   * Read local storage and apply theme if it exists
   * Apply light theme as default if theme does not exist
   */
  ngOnInit(): void {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', ThemeEnum.Light);
      this.currentTheme = ThemeEnum.Light;
    } else {
      if (localStorage.getItem('theme') === ThemeEnum.Dark) {
        this.currentTheme = ThemeEnum.Dark;
        this.body.classList.add(ThemeEnum.Dark);
        this.currentTheme = ThemeEnum.Dark;
      } else {
        this.currentTheme = ThemeEnum.Light;
        this.body.classList.add(ThemeEnum.Light);
        this.currentTheme = ThemeEnum.Light;
      }
    }
  }

  /**
   * Toggles theme between light and dark
   */
  toggleDarkMode(): void {
    if (localStorage.getItem('theme') === ThemeEnum.Dark) {
      localStorage.setItem('theme', ThemeEnum.Light);
      this.body.classList.remove(ThemeEnum.Dark);
      this.currentTheme = ThemeEnum.Light;
    } else {
      localStorage.setItem('theme', ThemeEnum.Dark);
      this.body.classList.add(ThemeEnum.Dark);
      this.currentTheme = ThemeEnum.Dark;
    }
  }
}

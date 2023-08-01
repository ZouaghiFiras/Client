// Angular
import {Directive, ElementRef, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

// Rxjs
import {Subscription} from 'rxjs';

// theme
import {themes} from './themes.const';
import {ThemeService} from './theme.service';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  private themeName = 'blankThemeProps';
  private themServiceSubscription: Subscription;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private themService: ThemeService
  ) {
  }

  public updateTheme(themeName) {
    const element = this.elementRef.nativeElement;
    const them = themes[themeName];
    for (const key in them) {
      element.style.setProperty(key, them[key]);
      this.document.body.style.setProperty(key, them[key]);
    }
  }

  ngOnInit() {
    this.updateTheme(this.themeName);
    this.themService.getActiveTheme()
      .subscribe(themeName => {
        this.themeName = themeName;
        this.updateTheme(this.themeName);

      });
  }

  ngOnDestroy() {
    if (this.themServiceSubscription) {
      this.themServiceSubscription.unsubscribe();
    }
  }
}

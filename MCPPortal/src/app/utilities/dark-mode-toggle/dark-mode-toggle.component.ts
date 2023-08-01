import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../_helpers/theme/theme.service';

/**
 * Component for toggling dark mode.
 */
@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html'
})
export class DarkModeToggleComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.apply();
  }

  setDarkModeTheme(): void {
    this.themeService.setDarkMode();
  }

  setLightModeTheme(): void {
    this.themeService.setLightMode();
  }

  setSystemModeTheme(): void {
    this.themeService.setSystemMode();
  }
}

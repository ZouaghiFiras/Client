/**
 * Angular
 */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {EntryService, MenuItemsService, Theme} from '../..';
import {AyncLocalStorageHelper} from '../../../shared';

@Component({
  selector: 'app-navmenu',
  templateUrl: 'navmenu.component.html',
  styleUrls: ['./navmenu.component.scss'],
  providers: [
    EntryService,
  ]
})
/**
 * class name's NavMenuComponent
 */
export class NavMenuComponent implements OnInit {
  public menuItems$: any;

  public themeData: Theme = new Theme();
  show = false;
  screen: string;

  /**
   * The constructor
   */
  constructor(
    private httpClient: HttpClient,
    private entryService: EntryService,
    private menuItemsService: MenuItemsService
  ) {
  }

  /**
   * ngOnInit() methode
   */
  ngOnInit() {
    console.log('NavMenuComponent: ngOnInit');
    this.loadMenuItems();
    const navMenuUrl: string = environment.NavMenuUrl;

    if (navMenuUrl) {
      this.loadMenu().then(result => {
        this.initMenu(result);
      });
    }

    // this.entryService.getAction().subscribe(data => {
    //   if (data.action) {
    //     const action = data.action;
    //
    //     if (action === 'ThemeChange') {
    //       this.themeData = data.value;
    //     }
    //   }
    // });

    AyncLocalStorageHelper.getItem<Theme>('theme')
      .then(data => {
        if (data) {
          this.themeData = data;
        } else {
          AyncLocalStorageHelper.setItem('theme', this.themeData);
        }
      });
  }


  public navigateTo(GoTo: any = '/dashboard', target: string = null): void {
  }

  private initMenu(menu: any): void {
    this.menuItems$ = menu;
  }

  private loadMenu(): Promise<any> {
    const sUrl: string = environment.NavMenuUrl;
    return this.httpClient
      .get(`${sUrl}?t=${new Date().getTime()}`)
      .toPromise()
      .then(response => {
        return response || {};
      });
  }

  /**
   * To get the navmenu items
   */
  private loadMenuItems() {
    this.menuItemsService.getmenuItems().subscribe(data => {
      this.menuItems$ = data;
    });
  }


}


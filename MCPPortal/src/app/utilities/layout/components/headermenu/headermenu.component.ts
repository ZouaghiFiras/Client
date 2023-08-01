import {Router} from '@angular/router';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'underscore';
import {Observable, Subject} from 'rxjs';
import {EntryService, Theme} from '../..';
import {AyncLocalStorageHelper} from '../../../shared';

@Component({
  selector: 'app-headermenu',
  templateUrl: 'headermenu.component.html',
  styleUrls: ['./headermenu.component.scss'],
  providers: [EntryService],
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  public menuItems: any;
  public themeData: Theme = new Theme();
  allMenuItems = [];
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private httpClient: HttpClient,
    private entryService: EntryService,
    private router: Router,
  ) {
  }

  public showMenu(item): boolean {
    return _.isNull(item.devOnly) ? true : !item.devOnly;
  }

  ngOnInit() {
    console.log('HeaderMenuComponent: ngOnInit');
    this.loadMenu(); /* .then(result => {
            this.initMenu(result);
        });
        this.changeMenu(); */
    // this.entryService.getAction().subscribe((data) => {
    //   if (data.action) {
    //     const action = data.action;
    //     if (action === 'ThemeChange') {
    //       this.themeData = data.value;
    //     }
    //   }
    // });

    AyncLocalStorageHelper.getItem<Theme>('theme').then((data) => {
      if (data) {
        this.themeData = data;
      } else {
        AyncLocalStorageHelper.setItem('theme', this.themeData);
      }
    });
  }

  reset(menu) {
    this.router.navigateByUrl(menu.url);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  private changeMenu() {
    if (this.allMenuItems) {
      this.menuItems = this.allMenuItems.filter(
        (y) => y.name !== 'Dossier'
      );
    }
  }

  private loadMenu() {
    const sUrl = `/assets/menu.json`;
    const result: Observable<any> = this.httpClient.get(sUrl);
    result.subscribe((x) => {
      this.allMenuItems = x;
      this.changeMenu();
    });
  }
}

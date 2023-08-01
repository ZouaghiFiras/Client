import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {DefaultLangChangeEvent, TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environments/environment';
import {SettingsSingletonService, Theme, ThemeService} from '../..';
import {AyncLocalStorageHelper, SharedService, UserProfile} from '../../../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('viewheader', {static: false}) headerView: ElementRef;
  public eProductType = environment.ProductType;
  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};
  public profile: UserProfile = new UserProfile();
  public state: string;
  public notificationMessage: string;
  public notificationParams: string[];
  public themeData: Theme = new Theme();
  userRole: any;
  destroySubject$: Subject<void> = new Subject();
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private themeService: ThemeService,
    public translate: TranslateService,
  ) {
    console.log('Full-Layout: Constructor');

    this.subscriptions.push(
      fromEvent(window, 'resize')
        .pipe(debounceTime(250))
        .subscribe((event) => {
          this.onResize(event);
        }));
  }

  public showMenu(): boolean {
    if (environment.ProductType === 'DEV') {
      return true;
    }

    return false;
  }

  public showThemeBreadCrumbs(): boolean {
    return this.themeData.showBreadCrumbs;
  }

  public ChangeRoute(routeValue): void {
    console.log('> Full-Layout: changeRoute: ' + routeValue);

    if (this.router.url !== routeValue) {
      setTimeout(() => {
        this.router.navigate([routeValue]);
      }, 500);
    }
  }

  public logOutUser() {
    localStorage.removeItem(environment.TokenName);
    localStorage.removeItem(environment.ReturnUrlName);
    localStorage.removeItem(environment.AuthenticationProvider);
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/pages/login']);
    setTimeout(() => {
    }, 200);
  }

  ngOnInit() {
    console.log('Full-Layout: ngOnInit');

    this.subscriptions.push(this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
      // do something
    }));

    this.subscriptions.push(this.sharedService.changeEmitted$.subscribe(data => {
      if (!data) {
        return;
      }

      if (data.action === 'notification') {
        this.state = data.value.state;
        this.notificationMessage = data.value.notificationMessage;
        this.notificationParams = data.value.notificationParams;
      }
    }));

    AyncLocalStorageHelper.getItem<Theme>('theme')
      .then(data => {
        if (data) {
          this.themeData = data;
          this.themeService.setActiveTheme(this.themeData.themeProps);
        } else {
          AyncLocalStorageHelper.setItem('theme', this.themeData);
        }
      });
  }

  ngAfterViewInit() {
    console.log('Full-Layout: ngAfterViewInit');

    setTimeout(_ => this.inflate());
  }

  ngOnDestroy() {
    console.log('Full-Layout: ngOnDestroy');

    if (this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
    this.destroySubject$.next();
  }

  private inflate() {
    console.log('Full-Layout: inflate');

    if (typeof (Event) === 'function') {
      this.onResize(new Event('resize'));
    } else {
      const event = document.createEvent('Event');

      event.initEvent('resize', true, true);
      this.onResize(event);
    }
  }

  private onResize(event) {
    console.log('Full-Layout: onResize');

    const innerWindowHeight = window.innerHeight;
    const innerWindowWidth = window.innerWidth;
    const headerHeight = 45;

    SettingsSingletonService.getInstance().setRect(innerWindowWidth, innerWindowHeight - headerHeight);
  }
}


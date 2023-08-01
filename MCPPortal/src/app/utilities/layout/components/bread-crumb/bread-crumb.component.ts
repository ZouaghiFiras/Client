import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {BreadCrumb} from '../../models/bread-crumb';
import {TranslateService} from '@ngx-translate/core';
import {Extensions} from '../../../shared';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumbs';
  items: BreadCrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.addBreadCrumbs();
    }, 500);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.addBreadCrumbs());
  }

  addBreadCrumbs() {
    this.items = [];
    this.items.push({title: 'Dashboard', text: this.translateService.instant('Breadcrumb.' + 'Dashboard'), route: 'dashboard'});
    this.items.push(...this.createBreadcrumbs(this.activatedRoute.root));
    const uniqueItems = Array.from(new Set(this.items.map(a => a.title))).map(title => this.items.find(a => a.title === title));
    this.items = [...uniqueItems];
  }

  public onItemClick(item: BreadCrumb): void {
    const index = this.items.findIndex((e) => e.title === item.title);
    this.items = this.items.slice(0, index + 1);
    this.router.navigate([this.items[index].route]);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadCrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (!Extensions.isStringNullOrEmpty(label)) {
        breadcrumbs.push({title: label, text: this.translateService.instant('Breadcrumb.' + label), route: url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }


}

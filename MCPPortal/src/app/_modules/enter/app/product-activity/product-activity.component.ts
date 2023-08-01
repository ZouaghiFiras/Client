import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {ProductActivity} from '../core/interfaces/product-activity.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {ProductActivityPageActions} from './actions';
import {merge} from 'rxjs';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-product-activity',
  templateUrl: './product-activity.component.html',
})
export class ProductActivityComponent implements OnInit {
  title = 'Product Activity';
  public current = 0;

  public steps = [
    { label: 'Activity', icon: 'user' },
    { label: 'Coverage', icon: 'book' },
    { label: 'Object', icon: 'paperclip'},
    { label: 'Sub Object', icon: 'file-add' },
  ];
  activityNamesAndIcons: { name: string, icon: string, id: string }[] = [];

  public selectedMainActivity = '';
  productActivityForm = this.fb.group(
    {
      activity: [null, [Validators.required]],
    },
    {
      updateOn: 'blur'
    }
  );
  activityCtrl = this.productActivityForm.get('activity');
  submitted = false;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadActivityNamesAndIcons().subscribe(
      activityNamesAndIcons => {
        this.activityNamesAndIcons = activityNamesAndIcons;
        console.log(this.activityNamesAndIcons);
      },
      error => {
        console.error(error);
      }
    );

    this.store
      .select(fromRoot.selectProductActivityGroupData)
      .pipe(take(1))
      .subscribe((productActivity: ProductActivity) =>
        this.productActivityForm.patchValue(productActivity, { emitEvent: false })
      );

    const activity$ = this.activityCtrl.valueChanges.pipe(
      map((activity: string) => ({ activity } as Partial<ProductActivity>))
    );


    merge(activity$).subscribe(
      (payload: Partial<ProductActivity>) => {
        this.store.dispatch(ProductActivityPageActions.patch({ payload }));
      }
    );

    this.productActivityForm.valueChanges
      .pipe(
        map(() => this.productActivityForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          ProductActivityPageActions.changeValidationStatus({ isValid })
        )
      );
  }
  selectMainActivity(mainActivityId: string) {
    this.selectedMainActivity = mainActivityId;
    this.prospectApiService.setProductMainActivityData(this.selectedMainActivity);
  }
  goToNextStep() {
    if (this.productActivityForm.invalid) {
      this.submitted = true;
      return;
    }
    this.router.navigate(['enter/property/product_coverage']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/reporter_information']);
  }
}

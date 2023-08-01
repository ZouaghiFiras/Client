import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {ProductCoverage} from '../core/interfaces/product-coverage.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {ProductCoveragePageActions} from './actions';
import {merge} from 'rxjs';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-product-coverage',
  templateUrl: './product-coverage.component.html',
})
export class ProductCoverageComponent implements OnInit {
  title = 'Product Coverage';
  coverageNamesAndIcons: { name: string, icon: string , id: string , code: string}[] = [];
  public current = 1;

  public steps = [
    { label: 'Activity', icon: 'user' },
    { label: 'Coverage', icon: 'book' },
    { label: 'Object', icon: 'paperclip'},
    { label: 'Sub Object', icon: 'file-add' },
  ];
  productCoverageForm = this.fb.group(
    {
      coverage: [null, [Validators.required]],
    },
    {
      updateOn: 'blur'
    }
  );
  coverageCtrl = this.productCoverageForm.get('coverage');
  submitted = false;
  private selectedCoverage: { coverageId: string; coverageCode: string };

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadCoverageNamesAndIcons().subscribe(
    coverageNamesAndIcons => {
      this.coverageNamesAndIcons = coverageNamesAndIcons;
      console.log(this.coverageNamesAndIcons);
    },
    error => {
      console.error(error);
    });
    this.store
      .select(fromRoot.selectProductCoverageGroupData)
      .pipe(take(1))
      .subscribe((productCoverage: ProductCoverage) =>
        this.productCoverageForm.patchValue(productCoverage, { emitEvent: false })
      );
    const coverage$ = this.coverageCtrl.valueChanges.pipe(
      map((coverage: string) => ({ coverage } as Partial<ProductCoverage>))
    );

    merge(coverage$).subscribe(
      (payload: Partial<ProductCoverage>) => {
        this.store.dispatch(ProductCoveragePageActions.patch({ payload }));
      }
    );

    this.productCoverageForm.valueChanges
      .pipe(
        map(() => this.productCoverageForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          ProductCoveragePageActions.changeValidationStatus({ isValid })
        )
      );
  }
  goToNextStep() {
    if (this.productCoverageForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/product_object']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/product_activity']);
  }

  selectCoverage(coverageId: string, coverageCode: string) {
    this.selectedCoverage = {coverageId, coverageCode};
    this.prospectApiService.setProductCoverageData(this.selectedCoverage);
  }
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../core/state';
import { ProductSubObject } from '../core/interfaces/product-sub-object.interface';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { ProductSubObjectPageActions } from './actions';
import { merge } from 'rxjs';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-product-sub-object',
  templateUrl: './product-sub-object.component.html',
})
export class ProductSubObjectComponent implements OnInit {
  title = 'Product Sub-Object';
  public current = 3;
  subObjectNamesAndIcons: { name: string, icon: string , id: string}[] = [];
  productObject: any = null;
  public steps = [
    { label: 'Activity', icon: 'user' },
    { label: 'Coverage', icon: 'book' },
    { label: 'Object', icon: 'paperclip' },
    { label: 'Sub Object', icon: 'file-add' },
  ];
  productSubObjectForm = this.fb.group(
    {
      subObject: [null, [Validators.required]],
    },
    {
      updateOn: 'blur',
    }
  );
  subObjectCtrl = this.productSubObjectForm.get('subObject');
  submitted = false;
  private selectedSubObjectId: any;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadSubObjectNamesAndIcons().subscribe(
      subObjectNamesAndIcons => {
        this.subObjectNamesAndIcons = subObjectNamesAndIcons;
        console.log(this.subObjectNamesAndIcons);
      },
      error => {
        console.error(error);
      });
    this.store
      .select(fromRoot.selectProductSubObjectGroupData)
      .pipe(take(1))
      .subscribe((productSubObject: ProductSubObject) =>
        this.productSubObjectForm.patchValue(productSubObject, { emitEvent: false })
      );

    const subObject$ = this.subObjectCtrl.valueChanges.pipe(
      map((subObject: string) => ({ subObject } as Partial<ProductSubObject>))
    );

    merge(subObject$).subscribe((payload: Partial<ProductSubObject>) => {
      this.store.dispatch(ProductSubObjectPageActions.patch({ payload }));
    });

    this.productSubObjectForm.valueChanges
      .pipe(
        map(() => this.productSubObjectForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(ProductSubObjectPageActions.changeValidationStatus({ isValid }))
      );
  }
  selectSubObject(subObjectId: string) {
    this.selectedSubObjectId = subObjectId;
    this.prospectApiService.setProductSubObjectData(this.selectedSubObjectId);
  }
  goToNextStep() {
    if (this.productSubObjectForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/parties']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/product_object']);
  }
}

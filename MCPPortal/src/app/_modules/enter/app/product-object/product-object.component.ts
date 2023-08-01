import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {ProductObject} from '../core/interfaces/product-object.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {ProductObjectPageActions} from './actions';
import {merge} from 'rxjs';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-product-object',
  templateUrl: './product-object.component.html',
})
export class ProductObjectComponent implements OnInit {
  title = 'Product Object';
  objectNamesAndIcons: { name: string, icon: string , id: string}[] = [];
  public current = 2;

  public steps = [
    { label: 'Activity', icon: 'user' },
    { label: 'Coverage', icon: 'book' },
    { label: 'Object', icon: 'paperclip'},
    { label: 'Sub Object', icon: 'file-add' },
  ];
  productObjectForm = this.fb.group(
    {
      object: [null, [Validators.required]],
    },
    {
      updateOn: 'blur'
    }
  );
  objectCtrl = this.productObjectForm.get('object');
  submitted = false;
  private selectedObjectId: string;

  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.prospectApiService.loadObjectNamesAndIcons().subscribe(
      objectNamesAndIcons => {
        this.objectNamesAndIcons = objectNamesAndIcons;
        console.log(this.objectNamesAndIcons);
      },
      error => {
        console.error(error);
      });
    this.store
      .select(fromRoot.selectProductObjectGroupData)
      .pipe(take(1))
      .subscribe((productObject: ProductObject) =>
        this.productObjectForm.patchValue(productObject, { emitEvent: false })
      );

    const object$ = this.objectCtrl.valueChanges.pipe(
      map((object: string) => ({ object } as Partial<ProductObject>))
    );


    merge(object$).subscribe(
      (payload: Partial<ProductObject>) => {
        this.store.dispatch(ProductObjectPageActions.patch({ payload }));
      }
    );

    this.productObjectForm.valueChanges
      .pipe(
        map(() => this.productObjectForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          ProductObjectPageActions.changeValidationStatus({ isValid })
        )
      );
  }
  selectObject(objectId: string) {
    this.selectedObjectId = objectId;
    this.prospectApiService.setProductObjectData(this.selectedObjectId);
  }
  goToNextStep() {
    if (this.productObjectForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/product_sub_object']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/product_coverage']);
  }
}


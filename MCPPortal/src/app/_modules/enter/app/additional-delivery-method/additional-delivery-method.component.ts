import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {AdditionalDeliveryMethod} from '../core/interfaces/additional-delivery-method.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {AdditionalDeliveryMethodPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-additional-delivery-method',
  templateUrl: './additional-delivery-method.component.html',
})
export class AdditionalDeliveryMethodComponent implements OnInit {
  title = 'Additional Delivery Method';

  public current = 4;

  public steps = [
    { label: 'Additional Questions', icon: 'user' },
    { label: 'Additional Activities', icon: 'book' },
    { label: 'Activity Execution', icon: 'paperclip'},
    { label: 'Reporting Form', icon: 'file-add' },
    { label: 'Delivery Method', icon: 'file-add' },
    { label: 'Additional Documents', icon: 'file-add' },
  ];

  additionalDeliveryMethodForm = this.fb.group(
    {
      deliveryMethod: [null],
      comments: [null, Validators.maxLength(10000)]
    }
  );

  deliveryMethodCtrl = this.additionalDeliveryMethodForm.get('deliveryMethod');
  commentsCtrl = this.additionalDeliveryMethodForm.get('comments');

  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectAdditionalDeliveryMethodGroupData)
      .pipe(take(1))
      .subscribe((additionalDeliveryMethod: AdditionalDeliveryMethod) =>
        this.additionalDeliveryMethodForm.patchValue(additionalDeliveryMethod, { emitEvent: false })
      );
    const deliveryMethod$ = this.deliveryMethodCtrl.valueChanges.pipe(
      map((deliveryMethod: string) => ({ deliveryMethod } as Partial<AdditionalDeliveryMethod>))
    );

    const comments$ = this.commentsCtrl.valueChanges.pipe(
      map((comments: string) => ({ comments } as Partial<AdditionalDeliveryMethod>))
    );

    merge(
      deliveryMethod$,
      comments$
    ).subscribe((payload: Partial<AdditionalDeliveryMethod>) => {
      this.store.dispatch(AdditionalDeliveryMethodPageActions.patch({ payload }));
    });

    this.additionalDeliveryMethodForm.valueChanges
      .pipe(
        map(() => this.additionalDeliveryMethodForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          AdditionalDeliveryMethodPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.additionalDeliveryMethodForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/additional_documents']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/additional_reporting_form']);
  }
}

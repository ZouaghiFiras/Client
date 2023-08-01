import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {AdditionalDocuments} from '../core/interfaces/additional-documents.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {AdditionalDocumentsPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-additional-documents',
  templateUrl: './additional-documents.component.html',
})
export class AdditionalDocumentsComponent implements OnInit {
  title = 'Additional Documents';
  public current = 5;

  public steps = [
    { label: 'Additional Questions', icon: 'user' },
    { label: 'Additional Activities', icon: 'book' },
    { label: 'Activity Execution', icon: 'paperclip'},
    { label: 'Reporting Form', icon: 'file-add' },
    { label: 'Delivery Method', icon: 'file-add' },
    { label: 'Additional Documents', icon: 'file-add' },
  ];

  additionalDocumentsForm = this.fb.group(
    {
      comments: [null, Validators.maxLength(10000)]
    }
  );
  commentsCtrl = this.additionalDocumentsForm.get('comments');

  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectAdditionalDocumentsGroupData)
      .pipe(take(1))
      .subscribe((additionalDocuments: AdditionalDocuments) =>
        this.additionalDocumentsForm.patchValue(additionalDocuments, { emitEvent: false })
      );

    const comments$ = this.commentsCtrl.valueChanges.pipe(
      map((comments: string) => ({ comments } as Partial<AdditionalDocuments>))
    );

    merge(
      comments$
    ).subscribe((payload: Partial<AdditionalDocuments>) => {
      this.store.dispatch(AdditionalDocumentsPageActions.patch({ payload }));
    });

    this.additionalDocumentsForm.valueChanges
      .pipe(
        map(() => this.additionalDocumentsForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          AdditionalDocumentsPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.additionalDocumentsForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/appointment']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/additional_delivery_method']);
  }
}

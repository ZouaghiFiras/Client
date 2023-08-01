import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {AdditionalQuestions} from '../core/interfaces/additional-questions.interface';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {AdditionalQuestionsPageActions} from './actions';
import {merge} from 'rxjs';

@Component({
  selector: 'app-additional-questions',
  templateUrl: './additional-questions.component.html',
})
export class AdditionalQuestionsComponent implements OnInit {
  title = 'Additional Questions';

  public current = 0;

  public steps = [
    { label: 'Additional Questions', icon: 'user' },
    { label: 'Additional Activities', icon: 'book' },
    { label: 'Activity Execution', icon: 'paperclip'},
    { label: 'Reporting Form', icon: 'file-add' },
    { label: 'Delivery Method', icon: 'file-add' },
    { label: 'Additional Documents', icon: 'file-add' },
  ];
  additionalQuestionsForm = this.fb.group(
    {
      damageRepaired: [null],
      policeReportAvailable: [null],
      clientQuestion: [null, Validators.maxLength(100)],
    }
  );

  damageRepairedCtrl = this.additionalQuestionsForm.get('damageRepaired');
  policeReportAvailableCtrl = this.additionalQuestionsForm.get('policeReportAvailable');
  clientQuestionCtrl = this.additionalQuestionsForm.get('clientQuestion');
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromRoot.selectAdditionalQuestionsGroupData)
      .pipe(take(1))
      .subscribe((additionalQuestions: AdditionalQuestions) =>
        this.additionalQuestionsForm.patchValue(additionalQuestions, { emitEvent: false })
      );

    const damageRepaired$ = this.damageRepairedCtrl.valueChanges.pipe(
      map((damageRepaired: string) => ({ damageRepaired } as Partial<AdditionalQuestions>))
    );

    const policeReportAvailable$ = this.policeReportAvailableCtrl.valueChanges.pipe(
      map((policeReportAvailable: string) => ({ policeReportAvailable } as Partial<AdditionalQuestions>))
    );

    const clientQuestion$ = this.clientQuestionCtrl.valueChanges.pipe(
      map((clientQuestion: string) => ({ clientQuestion } as Partial<AdditionalQuestions>))
    );
    merge(
      damageRepaired$,
      policeReportAvailable$,
      clientQuestion$,
    ).subscribe((payload: Partial<AdditionalQuestions>) => {
      this.store.dispatch(AdditionalQuestionsPageActions.patch({ payload }));
    });

    this.additionalQuestionsForm.valueChanges
      .pipe(
        map(() => this.additionalQuestionsForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          AdditionalQuestionsPageActions.changeValidationStatus({ isValid })
        )
      );
  }

  goToNextStep() {
    if (this.additionalQuestionsForm.invalid) {
      this.submitted = true;
      return;
    }

    this.router.navigate(['enter/property/additional_activities']);
  }

  goToPreviousStep() {
    this.router.navigate(['enter/property/damage_additional_information']);
  }
}

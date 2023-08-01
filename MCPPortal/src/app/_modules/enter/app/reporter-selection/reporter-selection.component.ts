import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/state';
import {ReporterSelectionPageActions} from './actions';
import {distinctUntilChanged, map, take} from 'rxjs/operators';
import {merge} from 'rxjs';
import {ReporterSelection} from '../core/interfaces/reporter-selection.interface';
import {ProspectApiService} from '../../../../_services';

@Component({
  selector: 'app-reporter-selection',
  templateUrl: './reporter-selection.component.html',
})
export class ReporterSelectionComponent implements OnInit {
  title = 'Reporter Selection';
  public current = 0;
  public chosenReporterId = '';
  public steps = [
    { label: 'Reporter Selection', icon: 'user' },
    { label: 'Reporter Information', icon: 'book' },
  ];
  reportersData: any;

  reporterSelectionForm = this.fb.group({
    reporterSelection: [null, [Validators.required]],
  });
  reporterSelectionCtrl = this.reporterSelectionForm.get('reporterSelection');
  submitted = false;
  constructor(
    private prospectApiService: ProspectApiService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}
  ngOnInit() {
    this.prospectApiService.getReportersList().subscribe(data => {
        this.reportersData = data;
        this.prospectApiService.setReporterSelectionData(this.reportersData);
        console.log(this.reportersData);
      },
      (error: any) => {
        console.error('Failed to fetch reporters data:', error);
      });
    this.prospectApiService.getIntakeActivityExecutions().subscribe(data => {
        console.log(data);
      },
      (error: any) => {
        console.error('Failed to fetch  data:', error);
      });
    this.store
      .select(fromRoot.selectReporterSelectionGroupData)
      .pipe(take(1))
      .subscribe((reporterSelection: ReporterSelection) =>
        this.reporterSelectionForm.patchValue(reporterSelection, {emitEvent: false})
      );

    const reporterSelection$ = this.reporterSelectionCtrl.valueChanges.pipe(
      map((reporterSelection: string) => ({reporterSelection} as Partial<ReporterSelection>))
    );

    merge(reporterSelection$).subscribe(
      (payload: Partial<ReporterSelection>) => {
        this.store.dispatch(ReporterSelectionPageActions.patch({payload}));
      }
    );

    this.reporterSelectionForm.valueChanges
      .pipe(
        map(() => this.reporterSelectionForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(
          ReporterSelectionPageActions.changeValidationStatus({isValid})
        )
      );
  }
  selectReporter(reporterId: string) {
    this.chosenReporterId = reporterId;
    this.prospectApiService.postClientDetermination(this.chosenReporterId).subscribe(
      (response) => {
        // Handle the response from the API if needed
        this.prospectApiService.setReporterSelectionData(response);
      },
      (error) => {
        console.log(error);
        // Handle the error if needed
      }
    );
  }

  goToNextStep() {
    if (this.reporterSelectionForm.invalid) {
      this.submitted = true;
      console.log('no');
      return;
    }

    this.router.navigate(['enter/property/reporter_information']);
  }

}


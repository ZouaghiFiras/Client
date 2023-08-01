import {AfterViewInit, Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '@progress/kendo-angular-dialog';
import {ContactService} from '../../../../_services';

interface ComponentState {
  opened: boolean;
}

interface DialogState {
  [key: string]: ComponentState;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements AfterViewInit {
  @Input() workActivity: string;
  @Input() client: string;
  @Input() cause: string;
  @Input() coverage: string;
  @Input() product: string;
  @Input() intakeMethod: string;
  @Input() object: string;
  @Input() contactPerson: string;
  @Input() contactPersonEmail: string;

  public emailForm!: FormGroup;
  public dialogState: DialogState = {};

  constructor(
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
  ) {
  }

  ngAfterViewInit(): void {
    this.initializeForm();
  }

  /**
   * Closes the dialog.
   */
  public closeDialog(): void {
    this.setDialogState('dialog', false);
  }

  /**
   * Closes the specified dialog component.
   * @param component The name of the dialog component.
   */
  public close<T extends keyof DialogState>(component: T): void {
    this.setDialogState(component, false);
  }

  /**
   * Opens the specified dialog component.
   * @param component The name of the dialog component.
   */
  public open<T extends keyof DialogState>(component: T): void {
    this.setDialogState(component, true);
  }

  /**
   * Sends the email.
   */
  public async send(): Promise<void> {
    if (this.emailForm.valid) {
      const formValues = this.emailForm.value;
      try {
        await this.contactService
          .sendEmail(
            this.contactPersonEmail,
            this.contactPerson,
            formValues.subject,
            formValues.message,
          )
          .toPromise();
        this.closeDialog();
      } catch (error) {
        console.error('An error occurred while sending the email:', error);
        // TODO: Handle the error and display an appropriate message to the user.
      }
    }
  }

  /**
   * Initializes the email form.
   */
  private initializeForm(): void {
    this.emailForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  /**
   * Sets the state of the dialog component.
   * @param component The name of the dialog component.
   * @param opened The state to set for the dialog component.
   */
  private setDialogState<T extends keyof DialogState>(component: T, opened: boolean): void {
    if (!this.dialogState[component]) {
      this.dialogState[component] = {opened};
    } else {
      this.dialogState[component].opened = opened;
    }
  }
}

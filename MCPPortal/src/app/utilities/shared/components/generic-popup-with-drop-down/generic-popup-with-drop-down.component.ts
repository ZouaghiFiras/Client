import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EntityBase} from '../..';

@Component({
  selector: 'app-generic-popup-with-drop-down',
  templateUrl: './generic-popup-with-drop-down.component.html',
  styleUrls: ['./generic-popup-with-drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GenericPopupWithDropDownComponent implements OnInit {

  @Input() headerMessage = '';
  @Input() errorMessage = '';
  @Input() list: EntityBase[] = [];
  @Output() closeEvent = new EventEmitter<{ event: string, value: string }>();
  messages = [];
  opened = false;

  dropDownForm = new FormGroup({
    value: new FormControl(null, Validators.required)
  });


  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  close(event: string) {
    if (event === 'cancel' || event === 'no') {
      this.closePopup();
      return;
    }

    if (event === 'yes') {
      this.dropDownForm.markAllAsTouched();
      this.dropDownForm.updateValueAndValidity();
      if (this.dropDownForm.valid) {
        const value = this.dropDownForm.controls.value.value;
        this.closeEvent.emit({event, value});
        this.closePopup();
        return;
      }
    }
  }

  closePopup() {
    this.opened = false;
    this.dropDownForm.reset();
    return;
  }

  open() {
    this.opened = true;
    this.cd.detectChanges();
  }

}

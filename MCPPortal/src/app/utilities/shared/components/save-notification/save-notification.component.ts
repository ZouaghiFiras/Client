import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {NotificationService} from '@progress/kendo-angular-notification';
import {SharedService} from '../..';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-save-notification',
  templateUrl: './save-notification.component.html',
  styleUrls: ['./save-notification.component.scss'],
})
export class SaveNotificationComponent implements OnInit, OnChanges {
  @Input() notificationMessage: string;
  @Input() notificationParams: string[] = [];
  @Input() state: string;
  @ViewChild('template', {read: TemplateRef, static: false})
  public notificationTemplate: TemplateRef<any>;
  translatedMessage: string;

  constructor(
    private notificationService: NotificationService,
    private sharedService: SharedService,
    private translateService: TranslateService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notificationMessage && changes.notificationMessage.currentValue) {
      this.notificationMessage = changes.notificationMessage.currentValue;
    }
    if (changes.notificationParams && changes.notificationParams.currentValue) {
      this.notificationParams = changes.notificationParams.currentValue;
    }
    if (changes.state && changes.state.currentValue) {
      this.state = changes.state.currentValue;
    }
    if (this.state === 'success' && this.notificationMessage !== undefined) {
      this.translatedMessage = this.translateService.instant(this.notificationMessage, this.notificationParams);
      this.showSuccess();
    } else if (this.state === 'error' && this.notificationMessage !== undefined) {
      this.translatedMessage = this.translateService.instant(this.notificationMessage, this.notificationParams);
      this.showError();
    }
  }

  public showSuccess() {
    this.notificationService.show({
      content: this.notificationTemplate,
      position: {horizontal: 'right', vertical: 'top'},
      animation: {type: 'fade', duration: 2000},
      closable: false,
      type: {style: 'success', icon: true}
    });
    this.sharedService.emitChange({action: 'notification', value: {state: null, notificationMessage: '', notificationParams: null}});
  }

  public showError() {
    this.notificationService.show({
      content: this.notificationTemplate,
      position: {horizontal: 'right', vertical: 'top'},
      animation: {type: 'fade', duration: 2000},
      closable: false,
      type: {style: 'error', icon: true}
    });
    this.sharedService.emitChange({action: 'notification', value: {state: null, notificationMessage: '', notificationParams: null}});
  }
}

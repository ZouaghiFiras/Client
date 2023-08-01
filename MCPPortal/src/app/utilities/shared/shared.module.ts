// Angular
import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {GenericPopupWithDropDownComponent} from './components/generic-popup-with-drop-down/generic-popup-with-drop-down.component';
import {GenericPopUpComponent} from './components/generic-pop-up/generic-pop-up.component';
import {LayoutModule} from '@progress/kendo-angular-layout';
import {RouterModule} from '@angular/router';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
// import { SignInComponent } from './components/signin/signin.component';
import {SaveNotificationComponent} from './components/save-notification/save-notification.component';
import {GridModule} from '@progress/kendo-angular-grid';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {AlertMessageComponent} from './components/alert-message/alert-message.component';
import {NavigationModule} from '@progress/kendo-angular-navigation';
import {NotificationModule} from '@progress/kendo-angular-notification';
import {ProgressBarModule} from '@progress/kendo-angular-progressbar';
import {SmallHeaderMenuComponent} from './components/small-header-menu/small-header-menu.component';
import {FinishPopupComponent} from './components/finish-popup/finish-popup.component';
import {GridReactiveComponent} from './components/grid-reactive/grid-reactive.component';
import {GenericSettingsGridComponent} from './components/generic-settings-grid/generic-settings-grid.component';
import {ButtonModule, ButtonsModule} from '@progress/kendo-angular-buttons';
import {LabelModule} from '@progress/kendo-angular-label';
import {UploadModule} from '@progress/kendo-angular-upload';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    // kendo start
    LayoutModule,
    RouterModule,
    CommonModule,
    DialogModule,
    DropDownsModule,
    GridModule,
    InputsModule,
    DateInputsModule,
    NavigationModule,
    NotificationModule,
    ProgressBarModule,
    ButtonModule,
    LabelModule,
    UploadModule,
    ButtonsModule,
    // kendo end
  ],


  declarations: [
    GenericPopUpComponent,
    GenericPopupWithDropDownComponent,
    PreloaderComponent,
    // SignInComponent,
    SaveNotificationComponent,
    AlertMessageComponent,
    SmallHeaderMenuComponent,
    FinishPopupComponent,
    GridReactiveComponent,
    GenericSettingsGridComponent,
  ],

  providers: [
    DatePipe,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    // kendo start
    LayoutModule,
    RouterModule,
    CommonModule,
    DatePipe,
    DialogModule,
    DropDownsModule,
    GridModule,
    InputsModule,
    DateInputsModule,
    NavigationModule,
    NotificationModule,
    ProgressBarModule,
    ButtonModule,
    LabelModule,
    UploadModule,
    ButtonsModule,
    // kendo end
    GenericPopUpComponent,
    GenericPopupWithDropDownComponent,
    PreloaderComponent,
    // SignInComponent,
    SaveNotificationComponent,
    AlertMessageComponent,
    SmallHeaderMenuComponent,
    FinishPopupComponent,
    GridReactiveComponent,
  ]
})
export class SharedModule {
}

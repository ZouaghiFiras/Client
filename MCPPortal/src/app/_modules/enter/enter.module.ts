import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnterRoutingModule} from './enter-routing.module';
import {CardModule} from '@progress/kendo-angular-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MobilityComponent} from './enter/mobility/mobility.component';
import {PropertyComponent} from './enter/property/property.component';
import {DialogModule} from '@progress/kendo-angular-dialog';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './app/core/state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CoreModule} from './app/core/core.module';
import {SharedModule} from './app/shared/shared.module';
import {EnterComponent} from './enter/enter.component';


@NgModule({
  declarations: [EnterComponent, MobilityComponent, PropertyComponent],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    CoreModule,
    SharedModule,
    TranslateModule,
    CommonModule,
    EnterRoutingModule,
    CardModule,
    DialogModule,
  ]
})
export class EnterModule { }


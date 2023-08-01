import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './angular-bot/chat/chat.component';
import {ChatService} from '../../_services';
import {AngularBotComponent} from './angular-bot/angular-bot.component';
import {AngularBotRoutingModule} from './angular-bot-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, AngularBotRoutingModule],
  declarations: [ChatComponent, AngularBotComponent],
  providers: [ChatService],
})
export class AngularBotModule {}

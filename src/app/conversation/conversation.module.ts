import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversationPage } from './conversation.page';

import { ConversationPageRoutingModule } from './conversation-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ConversationPageRoutingModule
  ],
  declarations: [ConversationPage]
})
export class ConversationPageModule {}

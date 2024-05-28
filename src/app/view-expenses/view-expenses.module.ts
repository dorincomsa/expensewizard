import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewExpensesPage } from './view-expenses.page';

import { ViewExpensesPageRoutingModule } from './view-expenses-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ViewExpensesPageRoutingModule
  ],
  declarations: [ViewExpensesPage]
})
export class ViewExpensesPageModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddExpensePage } from './add-expense.page';

import { AddExpensePageRoutingModule } from './add-expense-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddExpensePageRoutingModule
  ],
  declarations: [AddExpensePage]
})
export class AddExpensePageModule {}

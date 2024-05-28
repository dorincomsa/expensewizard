import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExpensesPage } from './view-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: ViewExpensesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExpensesPageRoutingModule {}

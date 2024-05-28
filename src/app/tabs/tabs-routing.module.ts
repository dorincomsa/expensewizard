import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'view-expenses',
        loadChildren: () => import('../view-expenses/view-expenses.module').then(m => m.ViewExpensesPageModule)
      },
      {
        path: 'conversation',
        loadChildren: () => import('../conversation/conversation.module').then(m => m.ConversationPageModule)
      },
      {
        path: 'add-expense',
        loadChildren: () => import('../add-expense/add-expense.module').then(m => m.AddExpensePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/view-expenses',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/view-expenses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

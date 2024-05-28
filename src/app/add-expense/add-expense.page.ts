import { Component } from '@angular/core';
import { Service } from '../services/Service';

@Component({
  selector: 'app-add-expense',
  templateUrl: 'add-expense.page.html',
  styleUrls: ['add-expense.page.scss']
})
export class AddExpensePage {
  protected categories = this.service.categories
  protected name: string = '';
  protected category?: string = undefined;
  protected value?: number = undefined;
  protected date: string = new Date().toISOString();

  constructor(private service: Service) {}

  addExpense(): void {
    if(this.name && this.category && this.value && this.date){
      this.service.addExpense(this.name, this.category, this.value, this.date).subscribe(() => {
        console.log('added',this.name, this.category, this.value, this.date)
      })
    }
    this.name = '';
    this.category = undefined;
    this.value = undefined;
    this.date = new Date().toISOString();
  }
}

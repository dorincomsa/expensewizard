import { Component, OnInit } from '@angular/core';
import { Service } from '../services/Service';
import { Expense } from '../domain/expense';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-expenses',
  templateUrl: 'view-expenses.page.html',
  styleUrls: ['view-expenses.page.scss']
})
export class ViewExpensesPage implements OnInit {
  protected categories = this.service.categories
  protected expenses$?: Observable<Expense[]>;

  constructor(private service: Service) {}

  ngOnInit(): void {
    this.expenses$ = this.service.getExpenses();
  }

  deleteExpense(id?: string): void {
    if(id){
      this.service.deleteExpense(id).subscribe()
    }
  }

  computeCategoryImage(category: string): string{
    let path = 'assets/categories/';
    if(this.service.categories.includes(category)){
      return `${path}${category}.png`
    }
    else return `${path}other.png`
  }

}

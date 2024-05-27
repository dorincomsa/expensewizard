import { Component } from '@angular/core';
import { Service } from '../services/Service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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

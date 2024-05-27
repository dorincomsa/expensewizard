import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { Conversation } from "../domain/conversation";
import { Expense } from "../domain/expense";

@Injectable({
  providedIn: 'root'
})
export class Service {
  public categories = ["supermarket", "restaurant", "subscripiton", "service", "transport", "transfer", "withdraw", "fun", "health", "others"];
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);

  private baseUrl = 'http://localhost:8080'

  constructor(private httpClient: HttpClient){
    this.loadConversations();
    this.loadExpenses();
  }

  private loadExpenses(): void {
    const endpoint = `${this.baseUrl}/expenses`
    this.httpClient.get<Expense[]>(endpoint).subscribe(expenses => {
      this.expensesSubject.next(expenses)
    })
  }
  private loadConversations(): void {
    const endpoint = `${this.baseUrl}/conversations`
    this.httpClient.get<Conversation[]>(endpoint).subscribe(convesations => {
      this.conversationsSubject.next(convesations);
    })
  }

  getExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }
  addExpense(name: string, category: string, value: number, date: string): Observable<Expense> {
    const endpoint = `${this.baseUrl}/expenses`
    return this.httpClient.post<Expense>(endpoint, {name, category, value, date}).pipe(tap(expense => {
      const currentExpenses = this.expensesSubject.value;
      this.expensesSubject.next([...currentExpenses, expense])
    }));
  }

  getConvesations(): Observable<Conversation[]> {
    return this.conversationsSubject.asObservable();
  }
  addConversation(question: string): Observable<Conversation>{
    const endpoint = `${this.baseUrl}/conversations`
    return this.httpClient.post<Conversation>(endpoint, {question}).pipe(tap(convesation => {
      const currentConversations = this.conversationsSubject.value;
      this.conversationsSubject.next([...currentConversations, convesation])
    }));
  }

  deleteExpense(id: string): Observable<void> {
    const endpoint = `${this.baseUrl}/expenses/${id}`
    return this.httpClient.delete<void>(endpoint).pipe(tap(() => {
      const expenses = this.expensesSubject.value;
      const newExpenses = expenses.filter(expense => expense.id !== id);
      this.expensesSubject.next(newExpenses);
    }))
  }

  deleteConversation(id: string): Observable<void> {
    const endpoint = `${this.baseUrl}/conversations/${id}`
    return this.httpClient.delete<void>(endpoint).pipe(tap(() => {
      const conversations = this.conversationsSubject.value;
      const newConversations = conversations.filter(conversation => conversation.id !== id);
      this.conversationsSubject.next(newConversations);
    }))
  }
}

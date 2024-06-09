import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainService } from './main-service'; // Adjust the import according to your file structure
import { Expense } from '../domain/expense';
import { Conversation } from '../domain/conversation';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('MainService', () => {
  let mainService: MainService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MainService, HttpClient]
    });
    mainService = TestBed.inject(MainService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(mainService, 'getConvesations').and.returnValue(of([
      { id: '1', question: 'Test Question', response: 'Test Response', date: new Date('2023-01-01T00:00:00Z') }
    ] as Conversation[]));
    spyOn(mainService, 'addConversation').and.returnValue(of({
      id: '2', question: 'New Question', response: 'New Response', date: new Date('2023-01-01T00:00:00Z')
    } as Conversation));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load expenses on initialization', () => {
    const mockExpenses: Expense[] = [
      { id: '1', name: 'Test Expense', category: 'test', value: 100, day: 1, month: 'may', year: 2024 }
    ];

    mainService.getExpenses().subscribe(expenses => {
      expect(expenses).toEqual(mockExpenses);
    });

    const req = httpMock.expectOne(`${mainService['baseUrl']}/expenses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExpenses);
  });

  it('should load conversations on initialization', () => {
    const mockConversations: Conversation[] = [
      { id: '1', question: 'Test Question', response: 'Test Response', date: new Date('2023-01-01T00:00:00') }
    ];

    mainService.getConvesations().subscribe(conversations => {
      expect(conversations).toEqual(mockConversations);
    });

    const req = httpMock.expectOne(`${mainService['baseUrl']}/conversations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockConversations);
  });

  it('should add an expense', () => {
    const newExpense: Expense = { id: '2', name: 'New Expense', category: 'new', value: 200, day: 1, month: 'may', year: 2024 };

    mainService.addExpense(newExpense.name, newExpense.category, newExpense.value, '2023-05-01T00:00:00').subscribe(expense => {
      expect(expense).toEqual(newExpense);
    });

    const req = httpMock.expectOne(`${mainService['baseUrl']}/expenses`);
    expect(req.request.method).toBe('POST');
    req.flush(newExpense);
  });

  it('should add a conversation', () => {
    const newConversation: Conversation = { id: '2', question: 'New Question', response: 'New Response', date: new Date('2023-02-01T00:00:00') };

    mainService.addConversation(newConversation.question).subscribe(conversation => {
      expect(conversation).toEqual(newConversation);
    });

    const req = httpMock.expectOne(`${mainService['baseUrl']}/conversations`);
    expect(req.request.method).toBe('POST');
    req.flush(newConversation);
  });

  it('should delete an expense', () => {
    const id = '1';

    mainService.deleteExpense(id).subscribe();

    const req = httpMock.expectOne(`${mainService['baseUrl']}/expenses/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    mainService.getExpenses().subscribe(expenses => {
      expect(expenses.find(expense => expense.id === id)).toBeUndefined();
    });
  });

  it('should delete a conversation', () => {
    const id = '1';

    mainService.deleteConversation(id).subscribe();

    const req = httpMock.expectOne(`${mainService['baseUrl']}/conversations/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    // Verify the deletion in the conversationsSubject
    mainService.getConvesations().subscribe(conversations => {
      expect(conversations.find(conversation => conversation.id === id)).toBeUndefined();
    });
  });
});

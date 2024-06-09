import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversationPage } from './conversation.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainService } from '../services/main-service';
import { of } from 'rxjs';
import { Conversation } from '../domain/conversation';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ConversationPage', () => {
  let component: ConversationPage;
  let fixture: ComponentFixture<ConversationPage>;
  let mainService: MainService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversationPage],
      imports: [HttpClientTestingModule, FormsModule, HttpClientModule],
      providers: [MainService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    mainService = TestBed.inject(MainService)

    spyOn(mainService, 'getConvesations').and.returnValue(of([
      { id: '1', question: 'Test Question', response: 'Test Response', date: new Date('2023-01-01T00:00:00Z') }
    ] as Conversation[]));
    spyOn(mainService, 'addConversation').and.returnValue(of({
      id: '2', question: 'New Question', response: 'New Response', date: new Date('2023-01-01T00:00:00Z')
    } as Conversation));

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with conversations', () => {
    expect(component.conversations.length).toBe(1);
    expect(component.conversations[0].question).toBe('Test Question');
  });

  it('should add a new conversation on submit', () => {
    component.question = 'New Question';
    component.onSubmit();

    expect(mainService.addConversation).toHaveBeenCalledWith('New Question');
    expect(component.conversations.length).toBe(2);
    expect(component.conversations[0].question).toBe('New Question');
    expect(component.question).toBe('');
  });
});

import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';
import { Conversation } from '../domain/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: 'conversation.page.html',
  styleUrls: ['conversation.page.scss']
})
export class ConversationPage implements OnInit {

  question = ''
  conversations: Conversation[] = [];

  constructor(private service: MainService){}

  ngOnInit(): void {
    this.service.getConvesations().subscribe(conversations => {
      this.conversations = conversations.reverse()
    })
  }

  onSubmit(): void {
    this.service.addConversation(this.question).subscribe(response => {
      this.conversations.unshift(response)
    })
    this.question = ''
  }
}

import { Component, OnInit } from '@angular/core';
import { Service } from '../services/Service';
import { Conversation } from '../domain/conversation';
import { first } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  question = ''
  conversations: Conversation[] = [];

  constructor(private service: Service){}

  ngOnInit(): void {
    this.service.getConvesations().subscribe(conversations => {
      this.conversations = conversations.reverse().map(this.mapConversation)
    })
  }

  onSubmit(): void {
    this.service.addConversation(this.question).subscribe(response => {
      this.conversations.unshift(response)
    })
    this.question = ''
  }

  stringify(resp: any): string{
    return resp
  }

  mapConversation(conversation: Conversation): Conversation{
    console.log(conversation)
    return conversation;
  }

}

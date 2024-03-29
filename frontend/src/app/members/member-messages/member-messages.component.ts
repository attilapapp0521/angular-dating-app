import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message.model';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username: string;
 messageContent: string;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img-in1');
  }

  sendMessage(): void{
    this.messageService.sendMessage(this.username, this.messageContent).subscribe(
      message => {
          this.messages.push(message);
          this.messageForm.reset();
      });
  }


}

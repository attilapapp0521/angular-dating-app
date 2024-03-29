import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../_models/message.model';
import { Pagination } from '../_models/pagination.model';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService,
              private confirmService: ConfirmService) { }
  ngOnDestroy(): void {
    document.body.classList.remove('bg-img-in2');
  }

  ngOnInit(): void {
    document.body.classList.remove('bg-img-in1');
    document.body.classList.add('bg-img-in2');
    this.loadMessages();
  }

  loadMessages(): void{
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(
      response => {
          this.messages = response.result;
          this.pagination = response.pagination;
          this.loading = false;
      });

  }

  deleteMessage(id: number): void{
    this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(
      result => {
          if (result){
            this.messageService.deleteMessage(id).subscribe(
              () => {
                this.messages?.splice(this.messages.findIndex(m => m.id === id), 1);

              });
          }
      });

  }

  pageChanged(event: any): void{
      this.pageNumber = event.page;
      this.loadMessages();
  }



}

import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;

  constructor(public bfModalRef: BsModalRef) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty


  }

  confirm(): void{
    this.result = true;
    this.bfModalRef.hide();
  }

  decline(): void{
    this.result = false;
    this.bfModalRef.hide();
  }

}

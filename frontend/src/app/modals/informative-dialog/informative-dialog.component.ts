import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-informative-dialog',
  templateUrl: './informative-dialog.component.html',
  styleUrls: ['./informative-dialog.component.css']
})
export class InformativeDialogComponent implements OnInit {

  title: string;
  closeBtnName: string;
  
 
  constructor(public bsModalRef: BsModalRef) {}
  
 

  ngOnInit(): void {
  
  }

}

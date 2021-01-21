import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    document.body.classList.remove('bg-img-not_found');
  }

  ngOnInit(): void {
    document.body.classList.remove('bg-img-in1');
    document.body.classList.add('bg-img-not_found');
  }

}

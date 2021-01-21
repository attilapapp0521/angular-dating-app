import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { emit } from 'process';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  registerMode = false;
  //users: any;

  constructor(private accountService: AccountService,
              private router: Router) { }
              
  ngOnDestroy(): void {
    document.body.classList.remove('bg-img-home');
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      user =>{
          if(user !== null){
              this.router.navigateByUrl('/members');
          }
      })
    document.body.classList.remove('bg-img-in1');
    document.body.classList.add('bg-img-home');
    //this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  /*getUsers(){
    this.http.get('https://localhost:5001/api/users')
    .subscribe(users => this.users = users);
  }*/

  cancelRegisterMode(event: boolean){
       this.registerMode = event;  
  }
}

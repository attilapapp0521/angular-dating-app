import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { ConfirmService } from '../_services/confirm.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
 
  

  constructor(public accoutService: AccountService,
                private router: Router,
                private toastr: ToastrService,
                private confirmService: ConfirmService,
                private cookieService: CookieService) { }

  ngOnInit(): void {
    if(window.localStorage.getItem('firstEnter') === null){
      window.localStorage.setItem('firstEnter',"false");
      this.about();
    }   
  }

  login(){
      this.accoutService.login(this.model).subscribe(
        response => {
          this.router.navigateByUrl('/members');
        })
  }
  logout(){
    this.accoutService.logout();
    this.router.navigateByUrl('/');
  }

  about(){
      this.confirmService.informative();
  }

}

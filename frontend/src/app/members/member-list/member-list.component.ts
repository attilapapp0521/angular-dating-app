import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member.model';
import { Pagination } from 'src/app/_models/pagination.model';
import { User } from 'src/app/_models/user.model';
import { UserParams } from 'src/app/_models/userParams.model';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  constructor(private memberService: MembersService) { 
        this.userParams = this.memberService.getUserParams();
    }

  ngOnInit(): void {
    document.body.classList.add('bg-img-in1');
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(
      response => {
          this.members = response.result;
          this.pagination = response.pagination;
      })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any){
    this.userParams.page = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

}

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any): void{
    $event.returnValue = true;
  }

  constructor(private accountservice: AccountService,
              private memberService: MembersService,
              private toastr: ToastrService) {
                this.accountservice.currentUser$.pipe(take(1)).subscribe(
                  user => {
                    this.user = user;
                  }
                );
               }

  ngOnInit(): void {
    document.body.classList.add('bg-img-in1');
    this.loadMember();
  }

  loadMember(): void{
    this.memberService.getMember(this.user.username).subscribe(
      member => {
        this.member = member;
      }
    );
  }

  updateMember(): void{
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
        });
  }

}

import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member.model';
import { Pagination } from '../_models/pagination.model';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img-in1');
    this.loadLikes();
  }

  loadLikes(): void{
    this.membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(
      response => {
          this.members = response.result;
          this.pagination = response.pagination;
      });
  }

  pageChanged(event: any): void{
    this.pageNumber = event.page;
    this.loadLikes();
  }

}

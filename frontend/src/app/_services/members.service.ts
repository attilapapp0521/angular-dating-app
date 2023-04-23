import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member.model';
import { User } from '../_models/user.model';
import { UserParams } from '../_models/userParams.model';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationsHeaders } from './paginationHelper';
import {PaginatedResult} from '../_models/pagination.model';




@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;


  constructor(private http: HttpClient,
              private accountService: AccountService) {
                this.accountService.currentUser$.pipe(take(1)).subscribe(
                  user => {
                    this.user = user;
                    this.userParams = new UserParams(user);
                  });
  }

  getUserParams(): UserParams{
    return this.userParams;
  }

  setUserParams(params: UserParams): void{
    this.userParams = params;
  }

  resetUserParams(): UserParams{
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }


  getMembers(userParams: UserParams): Observable<any>{
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response){
      return of(response);
    }

    let params = getPaginationsHeaders(userParams.page, userParams.size);

    params = params.append('minAge', userParams.minAge === null ? '0' : userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge === null ? '0' : userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
    .pipe(tap(resp => {
      this.memberCache.set(Object.values(userParams).join('-'), resp);
    }));
  }


  getMember(username: string): Observable<any>{
    const member = [...this.memberCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((m: Member) => m.username === username);

    if (member){
      return of(member);
    }


    return this.http.get(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member): Observable<void>{
      return this.http.put(this.baseUrl + 'users', member).pipe(
        map(() => {
          const index = this.members.indexOf(member);
          this.members[index] = member;
        })
      );
  }

  setMainPhoto(photoId: number): Observable<object>{
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number): Observable<object>{
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId );
  }

  addLike(username: string): Observable<object>{
      return this.http.post(this.baseUrl + 'likes/' + username, {} );

  }

  getLikes(predicate: string, pageNumber, pageSize): Observable<PaginatedResult<Member[]>>{
    let params = getPaginationsHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
  }
}

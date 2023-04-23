import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient, ) { }


  login(model: User): Observable<void>{
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user){
         this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any): Observable<object>{
    return this.http.post(this.baseUrl + 'account/register', model);
  }

  setCurrentUser(user: User): void{
   if (user !== null){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).roles;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
   }
  }

  logout(): void{
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  getDecodedToken(token): any{
    return JSON.parse(atob(token.split('.')[1]));
  }
}

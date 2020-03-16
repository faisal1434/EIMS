import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfig } from 'src/app/configuration/api-config';
import { User } from 'src/app/models/common/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  @Output() fireLoginStatusChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  get isLogged(): boolean {
    return this.currentUserLogged != null;
  }
  get currentUserValue(): User {

    return this.currentUserSubject.value;
  }
  get currentUserLogged(): User {
    let data = this.currentUserSubject.value;
   
    if (data) {
      const payload = JSON.parse(window.atob(data.token.split('.')[1]));
      var u = new User();
      u.username = payload.username;
      u.role = payload.role;
      u.token = data.token;
      return u;
    }
    else
      return null;
    
  }
  get userName(): string {
    return this.currentUserLogged.username;
  }
  login(username: string, password: string) {
    let noAuthHeader = { headers: new HttpHeaders({ 'noauth': 'no auth' }) };
    return this.http.post<any>(`${ApiConfig.apiBaseUrl}/api/Account/Login`, { Username: username, Password: password }, noAuthHeader)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

        }
        this.notifyChange('login');
        return user;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.notifyChange('logout');
  }
  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    //console.log(allowedRoles);
    const userRole = this.currentUserLogged.role;
    //console.log(userRole);
    for (const r of allowedRoles) {
      if (r === userRole) {
        isMatch = true;
        break;
      }
    }

    return isMatch;
  }
  notifyChange(s: string) {
    this.fireLoginStatusChange.emit(s);
  }
  getLoginChangeEmitter() {
    return this.fireLoginStatusChange;
  }
}

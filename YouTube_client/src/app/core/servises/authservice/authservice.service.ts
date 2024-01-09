import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
  })
export class AuthService {
  private isAuthenticated = !!localStorage.getItem('authToken');

  private userNameSubject = new BehaviorSubject<string>(localStorage.getItem('authToken') ?? '');

  login(username: string, password: string): boolean {
    if (username !== '' && password !== '') {
      this.isAuthenticated = true;
      this.userNameSubject.next(username);
      localStorage.setItem('authToken', username);
      localStorage.setItem('authTokenPass', password);
    } else {
      this.isAuthenticated = false;
    }

    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userNameSubject.next('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenPass');
  }

  getUserName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}

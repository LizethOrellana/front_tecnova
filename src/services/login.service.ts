import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.urlApi}/auth/login`;
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && this.isAuthenticated()) {
      this.loggedIn$.next(true);
    }
  }

  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(this.apiUrl, { username, password }).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          //localStorage.setItem('exp', res.exp);
          this.loggedIn$.next(true);
          observer.next(res);
          observer.complete();
        },
        err => observer.error(err)
      );
    });
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');
    if (!token || !exp) return false;
    const now = Date.now();
    return now < parseInt(exp, 10);
  }


  authStatus(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getUsername(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || '';
  }

  logout() {
    localStorage.clear();
    this.loggedIn$.next(false);
  }
}

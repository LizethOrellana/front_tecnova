import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.urlApi}/auth/login`;
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (this.isBrowser() && this.isAuthenticated()) {
      this.loggedIn$.next(true);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(this.apiUrl, { username, password }).subscribe(
        res => {
          if (this.isBrowser()) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('exp', res.exp);
          }
          this.loggedIn$.next(true);
          observer.next(res);
          observer.complete();
        },
        err => observer.error(err)
      );
    });
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');
    if (!token || !exp) return false;
    return Date.now() < parseInt(exp, 10);
  }

  authStatus(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getUsername(): string {
    if (!this.isBrowser()) return '';
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || '';
  }

  getUserId(): number | null {
    if (!this.isBrowser()) return null;
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      const id = parseInt(payload.secuencial);
      console.log('ID del usuario:', id);
      return isNaN(id) || id <= 0 ? null : id;
    } catch {
      return null;
    }
  }


  logout() {
    if (this.isBrowser()) {
      localStorage.clear();
    }
    this.loggedIn$.next(false);
  }

  getUserData(): any {
    if (!this.isBrowser()) return null;
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        secuencial: payload.secuencial,
        nombre: payload.nombre,
        apellido: payload.apellido,
        telefono: payload.telefono,
        username: payload.sub,
        email: payload.email
      };
    } catch {
      return null;
    }
  }

  getNivelAcceso(): number {
    if (!this.isBrowser()) return 0;
    const token = localStorage.getItem('token');
    if (!token) return 0;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.nivel_acceso ?? 1;
    } catch {
      return 0;
    }
  }
}

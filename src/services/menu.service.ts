import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/Menu';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.urlApi}/api/menus`;

  constructor(private http: HttpClient) { }

  obtenerMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }
}

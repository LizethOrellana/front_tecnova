import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Carrito } from '../models/Carrito';
import { Observable, of } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = `${environment.urlApi}/api/carritos`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  obtenerTodos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/${id}`);
  }

  crear(carrito: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(this.apiUrl, carrito);
  }

  actualizar(id: number, carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.apiUrl}/${id}`, carrito);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerHistorialPorUsuario(usuarioId: number): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../models/TipoUsuario';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {
  private urlApiTipoUsuario = `${environment.urlApi}/api/tipo-usuario`;

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(this.urlApiTipoUsuario);
  }

  obtenerPorId(id: number): Observable<TipoUsuario> {
    return this.http.get<TipoUsuario>(`${this.urlApiTipoUsuario}/${id}`);
  }

  crear(tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
    return this.http.post<TipoUsuario>(this.urlApiTipoUsuario, tipoUsuario);
  }

  actualizar(id: number, tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
    return this.http.put<TipoUsuario>(`${this.urlApiTipoUsuario}/${id}`, tipoUsuario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApiTipoUsuario}/${id}`);
  }

}

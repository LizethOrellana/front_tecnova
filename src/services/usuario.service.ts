import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.urlApi}/usuarios`;

  constructor(private http: HttpClient) { }

  obtenerTodas(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  actualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarPorNombre(nombre: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/username/${nombre}`);
  }

  // Verificar cédula y obtener pregunta de seguridad
  obtenerPreguntaPorCedula(cedula: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/verificar-cedula/${cedula}`, { responseType: 'text' });
  }

  actualizarPassword(cedula: string, nuevaPassword: string): Observable<any> {
    const body = { nuevaPassword };  // ojo que la clave es 'nuevaPassword', debe coincidir con el backend
    return this.http.put(`${this.apiUrl}/actualizar-password/${cedula}`, body);
  }





}

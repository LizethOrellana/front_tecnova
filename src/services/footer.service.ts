import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../models/Footer';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private apiUrl = `${environment.urlApi}/api/footer`;

  constructor(private http: HttpClient) { }

  // ✅ Obtener todos los footers
  obtenerTodos(): Observable<Footer[]> {
    return this.http.get<Footer[]>(this.apiUrl);
  }

  // ✅ Obtener un footer por ID
  obtenerPorId(id: number): Observable<Footer> {
    return this.http.get<Footer>(`${this.apiUrl}/${id}`);
  }

  // ✅ Crear un nuevo footer
  crear(footer: Footer): Observable<Footer> {
    return this.http.post<Footer>(this.apiUrl, footer);
  }

  // ✅ Actualizar un footer existente
  actualizar(id: number, footer: Footer): Observable<Footer> {
    return this.http.put<Footer>(`${this.apiUrl}/${id}`, footer);
  }

  // ✅ Eliminar un footer por ID
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

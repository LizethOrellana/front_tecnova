import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/Empresa';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = `${environment.urlApi}/api/empresa`;

  constructor(private http: HttpClient) { }

  // GET empresa (primer registro, sin id)
  obtener(): Observable<Empresa> {
    return this.http.get<Empresa>(this.apiUrl);
  }

  // POST/PUT empresa con banners (tu backend usa POST para crear o actualizar)
  guardar(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }
  // POST/PUT empresa con banners (tu backend usa POST para crear o actualizar)
  guardarBanner(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl+'/banner', empresa);
  }

  // DELETE empresa por id
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

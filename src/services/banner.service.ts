import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Banner } from '../models/Banner';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = `${environment.urlApi}/api/banner`;

  constructor(private http: HttpClient) { }

  // ✅ Obtener todos los banners de una empresa
  obtenerPorEmpresa(empresaId: number): Observable<Banner[]> {
    return this.http.get<Banner[]>(`${this.apiUrl}/empresa/${empresaId}`);
  }

  // ✅ Obtener un banner por ID
  obtenerPorId(id: number): Observable<Banner> {
    return this.http.get<Banner>(`${this.apiUrl}/${id}`);
  }

  // ✅ Crear nuevo banner
  crear(banner: Banner): Observable<Banner> {
    return this.http.post<Banner>(this.apiUrl, banner);
  }

  // ✅ Actualizar banner
  actualizar(id: number, banner: Banner): Observable<Banner> {
    return this.http.put<Banner>(`${this.apiUrl}/${id}`, banner);
  }

  // ✅ Eliminar banner
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

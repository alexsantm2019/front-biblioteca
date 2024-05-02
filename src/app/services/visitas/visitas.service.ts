import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  private apiUrl = "http://localhost:8000/visitas";

  constructor(private http:HttpClient) { }

  getVisitas():Observable<any>{
    return this.http.get(`${this.apiUrl}/get_visitas`);
  }
  crearVisita(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear_visita`, data);
  }

  reporteMes():Observable<any>{
    return this.http.get(`${this.apiUrl}/reporte_mes`);
  }
}

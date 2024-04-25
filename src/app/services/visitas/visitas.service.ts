import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  private apiUrl = "http://localhost:8000/visitas";

  constructor(private http:HttpClient) { }

  crearVisita(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear_visita`, data);
  }






}




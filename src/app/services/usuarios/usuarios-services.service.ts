import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = "http://localhost:8000/usuarios";
  constructor(private http:HttpClient) { 
    
  }

    getUsuarios():Observable<any>{
    return this.http.get(`${this.apiUrl}/get_usuarios`);
    }
    
    crearUsuario(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/crear_usuario`, data);
    }

    buscarUsuario(cedula: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/buscar_usuario`, cedula);
    }
    
    // updateData(id: number, updatedData: any): Observable<any> {
    //   const url = `${this.apiUrl}/${id}`;
    //   return this.http.put<any>(url, updatedData);
    // }
    
    // patchData(id: number, updatedData: any): Observable<any> {
    //   const url = `${this.apiUrl}/${id}`;
    //   return this.http.patch<any>(url, updatedData);
    // }
    
    // deleteData(id: number): Observable<any> {
    //   const url = `${this.apiUrl}/${id}`;
    //   return this.http.delete<any>(url);
    // }



}

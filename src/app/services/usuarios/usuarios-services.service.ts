import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = "http://localhost:8000/usuarios";


  usuario: any; // Información del usuario
  isSuperUsuario: boolean = false; // Estado de superusuario

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
    
    updateUsuario(id: number, updatedData: any): Observable<any> {
      const url = `${this.apiUrl}/editar_usuario/${id}`;
      return this.http.put<any>(url, updatedData);
    }
    
    eliminarUsuario(id: number): Observable<any> {
      const url = `${this.apiUrl}/eliminar_usuario/${id}`;
      return this.http.delete<any>(url);
    }

    // Inyecto en nav-bar para mostrar el menú en caso de ser SuperAdministrador
    setUsuario(usuario: any) {
      this.usuario = usuario;
      this.isSuperUsuario = usuario.es_superusuario === 1 ? true : false;
    }

    isLoggedIn() {
      return this.usuario != null;
    }



}

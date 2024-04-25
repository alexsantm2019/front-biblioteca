import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private apiUrl = "http://localhost:8000/catalogos";
  
  constructor(private http:HttpClient) { }

    getCatalogos():Observable<any>{
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Ajusta el tipo de contenido según tu API
        'Access-Control-Allow-Origin': '*', // Puedes ajustar esto según la configuración de tu servidor
        // Otras cabeceras CORS si son necesarias
      });

    return this.http.get(`${this.apiUrl}/get_catalogos`, { headers });
    }
}

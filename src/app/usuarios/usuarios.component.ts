import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios-services.service'
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterByNamePipe } from '../pipes/filter-by-name.pipe';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [FilterByNamePipe]   // Importo Pipe
})
export class UsuariosComponent  implements OnInit {
  
  private usuariosService = inject(UsuariosService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  
  mostrarTodasLasColumnas: boolean = false;

  usuarios: any;
  searchText = '';
  currentPage = 1;
  pageSize = 10;

  ngOnInit(): void {    
    this.listaUsuarios();
  }

  async listaUsuarios() {
    try {
      this.usuarios = await this.getUsuarios().toPromise(); // Convierte el Observable a una promesa
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
    }
  }

  getUsuarios(): Observable<any[]> { 
    return this.usuariosService.getUsuarios().pipe(
      tap((data: any) => {        
      }),
      catchError(error => {
        console.error('Error en la búsqueda del usuario:', error);
        this.showError(error);
        return throwError(error);
      })
    );
  }  
  eliminarUsuario(id:number ){
    this.usuariosService.eliminarUsuario(id)
    .subscribe(
      (response: any) => {      
            this.showSuccess("Usuario eliminado correctamente");
            this.listaUsuarios();
      }, 
      (error: any) => {
          console.log("Error" + JSON.stringify(error))
      }) 
  }  

  getPageArray(length: number): number[] {
    const pageCount = Math.ceil(length / this.pageSize);
    return Array.from(Array(pageCount), (_, i) => i + 1);
  }  

  showSuccess(msg:any) {
    this.toastr.success(msg, 'Éxito!');
  }
  showError(msg:any) {
    this.toastr.error(msg, 'Error!');
  }

  toggleColumnas() {
    this.mostrarTodasLasColumnas = !this.mostrarTodasLasColumnas;
  }

}

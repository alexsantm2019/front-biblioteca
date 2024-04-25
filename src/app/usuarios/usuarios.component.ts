import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios-services.service'
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent  implements OnInit {
  
  private usuariosService = inject(UsuariosService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  usuarios: any;

  ngOnInit(): void {    
    this.listaUsuarios();
  }



  async listaUsuarios() {
    try {
      this.usuarios = await this.getUsuarios().toPromise(); // Convierte el Observable a una promesa
      // console.log("usuarios: " + JSON.stringify(this.usuarios));
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
      // this.showError();
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


  editarUsuario(usuario:String ){
    // this.usuariosService.deleteArticuloService(id)
    // .subscribe(
    //   (response: any) => {      
    //         this.getArticulos();
    //   }, 
    //   (error: any) => {
    //       console.log("Error" + JSON.stringify(error))
    //   }) 
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

  showSuccess(msg:any) {
    this.toastr.success(msg, 'Éxito!');
  }
  showError(msg:any) {
    this.toastr.error(msg, 'Error!');
  }

}

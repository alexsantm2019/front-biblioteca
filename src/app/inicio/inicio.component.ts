import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { UsuariosService } from '../services/usuarios/usuarios-services.service'
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent  implements OnInit{

  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  inicioForm!: FormGroup;
  cedula!: string;


  constructor(private formBuilder: FormBuilder) {
    this.inicioForm = this.formBuilder.group({
      cedula: ['', [Validators.required]],
    })
  }

  // constructor(private router: Router){}

    ngOnInit(): void { }


  gotToRegistro(){
    this.router.navigate(['registro'])
  }

  hasErrors(field: string, typeError: string) {
    return this.inicioForm.get(field)?.hasError(typeError) && this.inicioForm.get(field)?.touched;
  }
  
  async logueo(event: Event) {
    event.preventDefault(); // Evitar que se envíe el formulario
  
    // Marcar todos los campos del formulario como "touched" para activar las validaciones
    Object.values(this.inicioForm.controls).forEach(control => {
      control.markAsTouched();
    });
    
    // Verificar si el formulario es válido después de marcar todos los campos como "touched"
    if (this.inicioForm.valid) {
      // Si el formulario es válido, procede con la lógica de registro
      //console.log('Formulario válido. Proceder con el registro.');
      let infoUser = await this.buscarUsuario().toPromise();
      console.log("inforUser: " + JSON.stringify(infoUser))
      if(infoUser){
        this.showSuccess()  
        this.router.navigate(['/visita'], { state: { infoUser } });
      }       
    } else {
      // Si el formulario no es válido, se mostrarán automáticamente los mensajes de validación
      console.log('Formulario inválido. Revisar los mensajes de validación.');
    }
  }
  buscarUsuario(): Observable<any> {
    let cedula = this.inicioForm.value;
    return this.usuariosService.buscarUsuario(cedula).pipe(
      tap((data: any) => {
        // return data; 
    }
      ),
      catchError(error => {
        console.error('Error en la búsqueda del usuario:', error);
        this.showError();
        return throwError(error);
      })
    );
  }

  showSuccess() {
    this.toastr.success('Logueo exitoso', 'Éxito!');
  }

  showError() {
    this.toastr.error('No existe usuario con la cédula proporcionada. Por favor Registrate e inténtalo de nuevo', 'Error!');
  }
}

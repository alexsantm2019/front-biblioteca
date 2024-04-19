import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// Importo interface
// import {UsuariosInterface} from '../models/usuarios.model';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuariosService } from '../services/usuarios/usuarios-services.service'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent  implements OnInit{

  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  generos = ['Hombre', 'Mujer'];
  nacionalidades = ['Local', 'Nacional', 'Extranjero'];
  etnias = ['Mestiza', 'Blanca', 'Indígena', 'Afroecuatoriana', 'Montubia', 'Otra'];
  opciones = ['Sí', 'No'];

  usuarioForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      nacionalidad: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      etnia: ['', [Validators.required]],      
      discapacidad: ['', [Validators.required]],      
      recibir_informacion: ['', [Validators.required]],      
    })
  }
    get f() { return this.usuarioForm.controls; }

    ngOnInit():void{

    } 
    registrar(event: Event) {
      event.preventDefault(); // Evitar que se envíe el formulario
    
      // Marcar todos los campos del formulario como "touched" para activar las validaciones
      Object.values(this.usuarioForm.controls).forEach(control => {
        control.markAsTouched();
      });
      
      // Verificar si el formulario es válido después de marcar todos los campos como "touched"
      if (this.usuarioForm.valid) {
        // Si el formulario es válido, procede con la lógica de registro
        console.log('Formulario válido. Proceder con el registro.');

        this.crearUsuario();
      } else {
        // Si el formulario no es válido, se mostrarán automáticamente los mensajes de validación
        console.log('Formulario inválido. Revisar los mensajes de validación.');
      }
    }

    hasErrors(field: string, typeError: string) {
      return this.usuarioForm.get(field)?.hasError(typeError) && this.usuarioForm.get(field)?.touched;
    }

    crearUsuario(): void {
      this.usuariosService.crearUsuario(this.usuarioForm.value)
      .subscribe(
        response => {
          // console.log('Usuario registrado correctamente:', response);
          // Aquí puedes realizar cualquier acción adicional después de registrar el usuario
          this.showSuccess();
          this.router.navigate(['']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Aquí puedes manejar cualquier error que ocurra durante el registro del usuario
        }
      );
    }


    showSuccess() {
      this.toastr.success('Has sido registrado correctamente', 'Éxito!');
    }
    showError() {
      this.toastr.error('No se pudo registrar correctamente. Por favor inténtalo de nuevo', 'Error!');
    }
}

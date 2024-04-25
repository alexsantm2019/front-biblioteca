import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// Importo interface
// import {UsuariosInterface} from '../models/usuarios.model';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute  } from '@angular/router';
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

  listaSuperUsuario = [{key:0, value:'No'}, {key:1, value:'Si'}];  
  generos = ['Hombre', 'Mujer'];    
  nacionalidades = ['Local', 'Nacional', 'Extranjero'];
  etnias = ['Mestiza', 'Blanca', 'Indígena', 'Afroecuatoriana', 'Montubia', 'Otra'];
  opciones = ['Sí', 'No'];

  usuarioForm!: FormGroup;

  flag:any;  
  public usuarioEdit: any;
  public usuarioIdEdit: any;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
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
      es_superusuario: [''],      
    })
  }
    get f() { return this.usuarioForm.controls; }

    ngOnInit():void{

      this.route.queryParams.subscribe(params => {
        this.flag = params['flag'];
        if(this.flag ==='edit'){
          this.usuarioEdit = JSON.parse(params['usuario']);
          console.log("Datos de usurio EDIT (1): "+ JSON.stringify(this.usuarioEdit) )
          
          const generoSeleccionado = this.generos.includes(this.usuarioEdit.genero) ? this.usuarioEdit.genero : null;          
          const nacionalidadSeleccionada = this.nacionalidades.includes(this.usuarioEdit.nacionalidad) ? this.usuarioEdit.nacionalidad : null;
          const etniaSeleccionada = this.etnias.includes(this.usuarioEdit.etnia) ? this.usuarioEdit.etnia : null;
          const discapacidadSeleccionada = this.opciones.includes(this.usuarioEdit.discapacidad) ? this.usuarioEdit.discapacidad : null;
          const poseeInformacionSeleccionada = this.opciones.includes(this.usuarioEdit.recibir_informacion) ? this.usuarioEdit.recibir_informacion : null;          
          const opcionSuperusuarioSeleccionada = this.listaSuperUsuario.find(opcion => opcion.key === this.usuarioEdit.es_superusuario);

          setTimeout(() => {
            this.usuarioIdEdit = this.usuarioEdit.id;
            this.usuarioForm.patchValue({
              cedula: this.usuarioEdit.cedula,
              nombre: this.usuarioEdit.nombre,
              apellido: this.usuarioEdit.apellido,
              fecha_nacimiento: this.usuarioEdit.fecha_nacimiento,
              genero: generoSeleccionado,
              telefono: this.usuarioEdit.telefono,
              correo: this.usuarioEdit.correo,
              nacionalidad: nacionalidadSeleccionada,
              institucion: this.usuarioEdit.institucion,
              etnia: etniaSeleccionada,
              discapacidad: discapacidadSeleccionada,
              recibir_informacion: poseeInformacionSeleccionada,
              es_superusuario: opcionSuperusuarioSeleccionada!.key
            });
        }, 250);         
        } 
      });
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
          this.showSuccess("Usuario creado correctamente");
          this.router.navigate(['']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }

    editarUsuario(event: Event): void {
      event.preventDefault(); 
      this.usuariosService.updateUsuario(this.usuarioIdEdit, this.usuarioForm.value)
      .subscribe(
        response => {
          this.showSuccess("Usuario actualizado correctamente");
          this.router.navigate(['/usuarios']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
    showSuccess(msg:any) {
      this.toastr.success(msg, 'Éxito!');
    }
    showError() {
      this.toastr.error('No se pudo registrar correctamente. Por favor inténtalo de nuevo', 'Error!');
    }
}

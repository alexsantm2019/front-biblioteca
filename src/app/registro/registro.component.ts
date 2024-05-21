import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// Importo interface
// import {UsuariosInterface} from '../models/usuarios.model';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cedulaValidator } from './cedula-validator';
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
  
  public cedula: string = '';
  public verificarCedula: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.usuarioForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), cedulaValidator()]],
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
        this.showError('Formulario inválido. Por favor revisa los mensajes de validación e inténtalo de nuevo')
      }
    }

    hasErrors(field: string, typeError: string) {
      return this.usuarioForm.get(field)?.hasError(typeError) && this.usuarioForm.get(field)?.touched;
    }

    crearUsuario(): void {
      this.usuarioForm.patchValue({ es_superusuario: 0});
      this.usuariosService.crearUsuario(this.usuarioForm.value)
      .subscribe(
        response => {
          this.showSuccess("Usuario creado correctamente");
          this.router.navigate(['']);
        },
        error => {
          console.log('ERROR', error.error.cedula);
          let mensajeError = error.error.cedula.toString()
          this.showError(mensajeError)
          console.error('Error al registrar usuario:', error.error);
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
    showError(msg:any) {
      this.toastr.error(msg, 'Error!');
    }

    // onBlurValidarCedula(){
    //   let cedula = this.cedula;
    //   if(cedula) {
    //     this.verificarCedula = this.validadorDeCedula(cedula)

    //     if (this.verificarCedula) this.showSuccess("Cédula ingresada correctamente")
    //     else  this.showError("Cédula ingresada incorrectamente");
    //   }      
    // }
    // validadorDeCedula(cedulaEnviada:string): boolean {      
    //   let cedulaCorrecta = false;
    //   let cedula = String(cedulaEnviada);
    //   if (String(cedula).length == 10)
    //   {    
    //       let tercerDigito = parseInt(cedula.substring(2, 3));
    //       if (tercerDigito < 6) {
    //           // El ultimo digito se lo considera dígito verificador
    //           let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
    //           let verificador = parseInt(cedula.substring(9, 10));
    //           let suma:number = 0;
    //           let digito:number = 0;
    //           for (let i = 0; i < (cedula.length - 1); i++) {
    //               digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
    //               suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
    //           }
    //           suma= Math.round(suma);
    //           if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
    //               cedulaCorrecta = true;
    //           } else if ((10 - (Math.round(suma % 10))) == verificador) {
    //               cedulaCorrecta = true;
    //           } else {
    //               cedulaCorrecta = false;
    //           }
    //       } else {
    //           cedulaCorrecta = false;
    //       }
    //   } else {
    //       cedulaCorrecta = false;
    //   }
    //   return cedulaCorrecta;
    // }
}

import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { CatalogosService } from '../../services/catalogos/catalogos.service'
import { VisitasService } from '../../services/visitas/visitas.service'
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  private catalogosService = inject(CatalogosService);
  private visitasService = inject(VisitasService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  infoUsuario: any;
  usuarioId!: BigInt;
  isSuperusuario!: Boolean;
  catalogos: any;
  visitaForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.visitaForm = this.formBuilder.group({
      userId: [],
      catalogoId: ['', [Validators.required]],
      taller: ['', [Validators.required]],
      actividad: ['', [Validators.required]],            
      fecha: [],
    })
  }

  ngOnInit(): void {
    // Accede a los datos pasados desde la vista anterior
    this.infoUsuario = history.state.infoUser;   
    console.log("Datos de usuario: " + JSON.stringify(this.infoUsuario)) 
    this.usuarioId = history.state.infoUser.id;    
    this.isSuperusuario = history.state.infoUser.es_superusuario === 1? true : false;    
    this.listaCatalogos();
  }

  async listaCatalogos() {
    try {
      this.catalogos = await this.getCatalogos().toPromise(); // Convierte el Observable a una promesa
      // console.log("catalogos: " + JSON.stringify(this.catalogos));
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
      // this.showError();
    }
  }

  getCatalogos(): Observable<any[]> { 
    return this.catalogosService.getCatalogos().pipe(
      tap((data: any) => {
        // Aquí podrías realizar cualquier manipulación de los datos si es necesario
      }),
      catchError(error => {
        console.error('Error en la búsqueda del usuario:', error);
        // this.showError();
        return throwError(error);
      })
    );
  }

  registrarVisita(event: Event){
    event.preventDefault(); // Evitar que se envíe el formulario
    
      // Marcar todos los campos del formulario como "touched" para activar las validaciones
      Object.values(this.visitaForm.controls).forEach(control => {
        control.markAsTouched();
      });
      
      // Verificar si el formulario es válido después de marcar todos los campos como "touched"
      if (this.visitaForm.valid) {        
        //const fechaActual = new Date().toISOString();
        const fechaActual = new Date();
        const fechaHoraFormateada = this.formatDate(fechaActual) + ' ' + this.formatTime(fechaActual);

        // const fechaActual = new Date();
        // const fechaHoraISO = fechaActual.toISOString();

        this.visitaForm.patchValue({ userId: this.usuarioId });
        this.visitaForm.patchValue({ fecha: fechaHoraFormateada});
        
        console.log('Formulario válido. Proceder con el registro.');
        console.log("this.visitaForm: " + JSON.stringify(this.visitaForm.value))

        this.crearVisita();
      } else {
        // Si el formulario no es válido, se mostrarán automáticamente los mensajes de validación
        console.log('Formulario inválido. Revisar los mensajes de validación.');
      }
  }
  hasErrors(field: string, typeError: string) {
    return this.visitaForm.get(field)?.hasError(typeError) && this.visitaForm.get(field)?.touched;
  }

  crearVisita(): void {    
    this.visitasService.crearVisita(this.visitaForm.value)
    .subscribe(
      response => {
        this.showSuccess();
        this.router.navigate(['landing']);
      },
      error => {
        console.error('Error al registrar usuario:', error);
        // Aquí puedes manejar cualquier error que ocurra durante el registro del usuario
      }
    );
  }

  showSuccess() {
    this.toastr.success('Visita registrada correctamente', 'Éxito!');
  }
  showError() {
    this.toastr.error('No se pudo registrar correctamente. Por favor inténtalo de nuevo', 'Error!');
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  // Método para formatear la hora como "HH:mm"
  formatTime(date: Date): string {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  // Método auxiliar para agregar un cero delante de números menores que 10
  padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  // onSelect(catalogItem: CatalogItem): void {
  //   this.selectedCatalogItem = catalogItem;
  // }
}


import {AfterViewInit, Component, OnInit, ViewChild, inject, OnDestroy } from '@angular/core';
import { Observable, catchError, tap, throwError, takeUntil } from 'rxjs';
import { VisitasService } from '../../services/visitas/visitas.service'
import { CatalogosService } from '../../services/catalogos/catalogos.service'
import { VisitasInterface } from './../../models/visitas.model'
import { take, first } from 'rxjs/operators';

@Component({
  selector: 'app-reporte-mes',
  templateUrl: './reporte-mes.component.html',
  styleUrl: './reporte-mes.component.css'
})
export class ReporteMesComponent   implements OnInit {

  private visitasService = inject(VisitasService);
  private catalogosService = inject(CatalogosService);

  catalogos: any;
  datosReporteMes: any;
  datosReporteMesOriginal: any;
  anios: number[] = [];
  anioSeleccionado: number = 0;
  
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  ngOnInit(): void {
    this.getDataReporteMes();
    this.listaCatalogos();

    const fechaActual = new Date();
    this.anioSeleccionado = fechaActual.getFullYear();
    this.anios = Array.from({ length: 3 }, (_, i) => this.anioSeleccionado + i);
  }

  async listaCatalogos() {
    try {
      this.catalogos = await this.getCatalogos().toPromise(); // Convierte el Observable a una promesa
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
    }
  }
  getCatalogos(): Observable<any[]> { 
    return this.catalogosService.getCatalogos().pipe(
      tap((data: any) => {        
      }),
      catchError(error => {
        console.error('Error en la búsqueda del usuario:', error);
        return throwError(error);
      })
    );
  }  

  async getDataReporteMes() {
    try {
      this.datosReporteMesOriginal  = await this.reporteMes().toPromise(); // Convierte el Observable a una promesa
      await this.filtrarPorPeriodo();
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
    }
  }  
  filtrarPorPeriodo(){
    this.datosReporteMes = this.datosReporteMesOriginal.filter((item: { year: number; }) => item.year === this.anioSeleccionado)
  }

  reporteMes(): Observable<any[]> { 
    return this.visitasService.reporteMes().pipe(
      tap((data: any) => {
        // Aquí podrías realizar cualquier manipulación de los datos si es necesario
      }),
      catchError(error => {
        console.error('Error en la búsqueda del usuario:', error);
        return throwError(error);
      })
    );
  }   

  cambiarAnio(event: any): void {
    console.log("Cambiando de año...");
    const valor = event.target?.value;
    if (!valor) return; // Salir si no se ha seleccionado un valor  
    this.anioSeleccionado = parseInt(valor, 10);
    this.filtrarPorPeriodo();
  }

}

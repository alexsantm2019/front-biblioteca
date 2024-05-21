import {AfterViewInit, Component, OnInit, ViewChild, inject, OnDestroy } from '@angular/core';
import { Observable, catchError, tap, throwError, takeUntil } from 'rxjs';
import { VisitasService } from '../../services/visitas/visitas.service'
import { VisitasInterface } from './../../models/visitas.model'
import { take, first } from 'rxjs/operators';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';
import { TimezonePipe } from '../../pipes/timezone/timezone.pipe';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reporte-visita',
  templateUrl: './reporte-visita.component.html',
  styleUrl: './reporte-visita.component.css',
  providers: [FilterByNamePipe, TimezonePipe]   // Importo Pipe
})
export class ReporteVisitaComponent  implements OnInit{

  private visitasService = inject(VisitasService);
  // private datePipe= inject(DatePipe);

  visitas: VisitasInterface[] = [];
  searchText = '';
  currentPage = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.listaVisitas();
  }

   async listaVisitas() {
    try {
      const visitasObtenidas = await this.getVisitas().pipe(first()).toPromise();
      this.visitas = visitasObtenidas ? visitasObtenidas : [];
    } catch (error) {
      console.error('Error en la búsqueda del usuario:', error);
    }
  }

  getVisitas(): Observable<VisitasInterface[]> { 
    return this.visitasService.getVisitas().pipe(
      tap((data: any) => {
      }),
      catchError(error => {
        console.error('Error en la búsqueda del usuario:', error);
        return throwError(error);
      })
    );
  }

  getPageArray(length: number): number[] {
    const pageCount = Math.ceil(length / this.pageSize);
    return Array.from(Array(pageCount), (_, i) => i + 1);
  }

  // obtenerZonaHorariaLocal(): string {
  //   return Intl.DateTimeFormat().resolvedOptions().timeZone;
  // }

  // obtenerFechaFormateada(fecha: string): string {
  //   return this.datePipe.transform(fecha, 'yyyy-MM-dd HH:mm:ss');
  // }

}


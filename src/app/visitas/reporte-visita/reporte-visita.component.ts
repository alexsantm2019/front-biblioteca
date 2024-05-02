import {AfterViewInit, Component, OnInit, ViewChild, inject, OnDestroy } from '@angular/core';
import { Observable, catchError, tap, throwError, takeUntil } from 'rxjs';
import { VisitasService } from '../../services/visitas/visitas.service'
import { VisitasInterface } from './../../models/visitas.model'
import { take, first } from 'rxjs/operators';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';

@Component({
  selector: 'app-reporte-visita',
  templateUrl: './reporte-visita.component.html',
  styleUrl: './reporte-visita.component.css'
})
export class ReporteVisitaComponent  implements OnInit{

  private visitasService = inject(VisitasService);
  private filterByNamePipe = inject(FilterByNamePipe);

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

  filterByName() {
    console.log("Filtrando por pipes...")
    this.visitas = this.filterByNamePipe.transform(this.visitas, this.searchText);
  }

}


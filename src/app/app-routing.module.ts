import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { VisitaComponent } from './visitas/visita/visita.component';
import { ReporteVisitaComponent } from './visitas/reporte-visita/reporte-visita.component';
import { LandingComponent } from './landing/landing.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { ReporteMesComponent } from './visitas/reporte-mes/reporte-mes.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'visita', component: VisitaComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'catalogos', component: CatalogosComponent },
  { path: 'reporte-visita', component: ReporteVisitaComponent },
  { path: 'reporte-mes', component: ReporteMesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

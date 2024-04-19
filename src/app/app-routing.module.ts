import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { VisitaComponent } from './visita/visita.component';

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  //{path: '', component: InicioComponent},
  // {path: '**', redirectTo:'', component: InicioComponent},  
  { path: '', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'visita', component: VisitaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

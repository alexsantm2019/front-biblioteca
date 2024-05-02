import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './UI/navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VisitaComponent } from './visitas/visita/visita.component';
import { LandingComponent } from './landing/landing.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { FooterComponent } from './UI/navbar/footer/footer.component';
import { ReporteVisitaComponent } from './visitas/reporte-visita/reporte-visita.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { ReporteMesComponent } from './visitas/reporte-mes/reporte-mes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    RegistroComponent,
    VisitaComponent,
    LandingComponent,
    UsuariosComponent,
    CatalogosComponent,
    FooterComponent,
    ReporteVisitaComponent,
    FilterByNamePipe,
    ReporteMesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,  // CONSUMO API
    BrowserAnimationsModule, // asegúrate de importar BrowserAnimationsModule
    ToastrModule.forRoot() // Agrega ToastrModule.forRoot() aquí
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

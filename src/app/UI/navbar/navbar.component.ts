import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios-services.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public usuariosService = inject(UsuariosService);


  // constructor(private usuariosService: UsuariosService) {}

  // isSuperUsuario() {
  //   return this.usuariosService.isSuperUsuario;
  // }

}

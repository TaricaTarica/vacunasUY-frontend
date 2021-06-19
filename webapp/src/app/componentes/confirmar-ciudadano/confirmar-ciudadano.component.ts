import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilCiudadano } from 'src/app/interfaces/PerfilCiudadano';
import { Usuario } from 'src/app/interfaces/Usuario';
import { CiudadanoServiceService } from 'src/app/servicios/servicioCiudadano/ciudadano-service.service';

declare function toastMensaje(value: any): any;

@Component({
  selector: 'app-confirmar-ciudadano',
  templateUrl: './confirmar-ciudadano.component.html',
  styleUrls: ['./confirmar-ciudadano.component.css']
})
export class ConfirmarCiudadanoComponent implements OnInit {

  public user: Usuario

  constructor(private ciudadanoService: CiudadanoServiceService, private route: Router) { }

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      this.user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
    }
  }

  confirmar(){
    this.ciudadanoService.crearCiudadano(this.user).subscribe(data => {
      toastMensaje(data);
      setTimeout(() => 
      {
          this.route.navigate(['/']);
      },
      5000);
    }
    )
  }

}

import { Component, OnInit } from '@angular/core';
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

  perfilCiudadano: PerfilCiudadano
  public user: Usuario

  constructor(private ciudadanoService: CiudadanoServiceService) { }

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      this.user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
    }
    this.ciudadanoService.obtenerPerfilCiudadano(this.user.numero_documento).subscribe(data =>
      this.perfilCiudadano = {
        fnac: data.fnac, 
        poblacionObjetivo: data.tipo
      }
    );
  }

  confirmar(){
    console.log("entro")
    this.ciudadanoService.crearCiudadano(this.user).subscribe(data => {
      console.log(data) 
      toastMensaje(data)
    }
    )
  }

}

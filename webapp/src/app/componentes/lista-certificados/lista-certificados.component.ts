import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Certificado } from 'src/app/interfaces/Certificado';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RegistroVacunaServiceService } from 'src/app/servicios/servicioRegistroVacuna/registro-vacuna-service.service';

@Component({
  selector: 'app-lista-certificados',
  templateUrl: './lista-certificados.component.html',
  styleUrls: ['./lista-certificados.component.css']
})
export class ListaCertificadosComponent implements OnInit {

  user: Usuario;
  certificados: Array<Certificado> 

  constructor(private registroVacunaService: RegistroVacunaServiceService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      this.user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
      if(this.user.vacunador){
        this.router.navigate(['/']);
      }
      else{
        this.registroVacunaService.getCertificados(this.user.numero_documento).subscribe(data => {
          this.certificados = data;
          console.log(data)
        });
      }
    }
    else{
      this.router.navigate(['/']);
    } 
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Certificado } from 'src/app/interfaces/Certificado';
import { RegistroVacunaServiceService } from 'src/app/servicios/servicioRegistroVacuna/registro-vacuna-service.service';

@Component({
  selector: 'app-certificado-vacunacion',
  templateUrl: './certificado-vacunacion.component.html',
  styleUrls: ['./certificado-vacunacion.component.css']
})
export class CertificadoVacunacionComponent implements OnInit {

  certificado: Certificado;
  constructor(private route: ActivatedRoute, private servicioRegistroVacuna: RegistroVacunaServiceService) { }

  ngOnInit(): void {
    this.servicioRegistroVacuna.getCertificadoReserva(this.route.snapshot.params.id)
    .subscribe(data => {
      this.certificado = data;
      console.log(data);
    })  
  }

}

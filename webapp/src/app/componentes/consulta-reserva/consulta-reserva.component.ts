import { Component, OnInit } from '@angular/core';
import { ConsultaReservaCiudadano } from 'src/app/interfaces/ConsultaReservaCiudadano';
import { ServicioReservasService } from 'src/app/servicios/servicioReservas/servicio-reservas.service';

@Component({
  selector: 'app-consulta-reserva',
  templateUrl: './consulta-reserva.component.html',
  styleUrls: ['./consulta-reserva.component.css']
})
export class ConsultaReservaComponent implements OnInit {

  consultas: Array<ConsultaReservaCiudadano>;
  ci = "51067289"
  
  constructor(private servicioReserva: ServicioReservasService) { }

  ngOnInit(): void {
    this.servicioReserva.consultarReservasCiudadano(this.ci).subscribe(
      data => this.consultas = data
    );
  }

}

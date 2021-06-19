import { Component, OnInit } from '@angular/core';
import { PlanVacunacion } from 'src/app/interfaces/PlanVacunacion';
import { Departamento } from 'src/app/interfaces/Departamento';
import { Ubicacion } from 'src/app/interfaces/Ubicacion';
import { Reserva } from 'src/app/interfaces/Reserva';
import { ServicioReservasService } from 'src/app/servicios/servicioReservas/servicio-reservas.service';
import { Usuario } from 'src/app/interfaces/Usuario';

declare function toastMensaje(value: any): any;

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private servicioReserva: ServicioReservasService) { }

  planes: PlanVacunacion;
  departamentos: Departamento;
  ubicaciones: Ubicacion;
  reserva: Reserva;

  mensaje: String
  planSeleccionado: String
  departamentoSeleccionado: String
  ubicacionSeleccionada: string

  public user: Usuario;

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      this.user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
      this.servicioReserva.getPlanes(this.user.poblacionObjetivo, this.user.fnac).subscribe(planes => this.planes = planes);
    } 
    this.servicioReserva.getDepartamentos().subscribe(dptos => this.departamentos = dptos);
    this.ubicacionSeleccionada = '0';
    this.planSeleccionado = '0';
    this.departamentoSeleccionado = '0';
  }
  capturarPlan(){
    this.reserva = {
      'ci': this.user.numero_documento,
      'departamento': this.departamentoSeleccionado,
      'planVacunacion':  this.planSeleccionado,
      'ubicacion': this.ubicacionSeleccionada
    }
    console.log("departamento: ", this.departamentoSeleccionado)
    console.log("ubicacion: ", this.ubicacionSeleccionada)
    this.servicioReserva.crearReservar(this.reserva).subscribe(
      data => toastMensaje(data)
    );
  }
  capturarDepartamento(){
    this.servicioReserva.getUbicaciones(this.departamentoSeleccionado).subscribe(ubi => this.ubicaciones = ubi);
  }


}


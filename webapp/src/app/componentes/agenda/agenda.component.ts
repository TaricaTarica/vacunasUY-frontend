import { Component, OnInit } from '@angular/core';
import { AgendaServiceService } from 'src/app/servicios/agenda-service.service';
import { PlanVacunacion } from 'src/app/interfaces/PlanVacunacion';
import { Departamento } from 'src/app/interfaces/Departamento';
import { Ubicacion } from 'src/app/interfaces/Ubicacion';

declare function toastMensaje(value: any): any;

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private servicioAgenda: AgendaServiceService) { }

  planes: PlanVacunacion;
  departamentos: Departamento;
  ubicaciones: Ubicacion;

  mensaje: String
  planSeleccionado: String
  departamentoSeleccionado: String
  ubicacionSeleccionada: string

  ngOnInit(): void {
    this.servicioAgenda.getPlanes().subscribe(planes => this.planes = planes);
    this.servicioAgenda.getDepartamentos().subscribe(dptos => this.departamentos = dptos);
    this.ubicacionSeleccionada = '0';
    this.planSeleccionado = '0';
    this.departamentoSeleccionado = '0';
  }
  capturarPlan(){
    console.log('dpto', this.departamentoSeleccionado);
    console.log('plan', this.planSeleccionado);
    console.log('ubi', this.ubicacionSeleccionada);
    this.mensaje = " manito";
    toastMensaje(this.mensaje);
  }
  capturarDepartamento(){
    this.servicioAgenda.getUbicaciones(this.departamentoSeleccionado).subscribe(ubi => this.ubicaciones = ubi);
  }


}


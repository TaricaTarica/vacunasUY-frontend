import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompCent } from '../../globals';
import { ConsultaReservaCiudadano } from 'src/app/interfaces/ConsultaReservaCiudadano';
import { Departamento } from 'src/app/interfaces/Departamento';
import { PlanVacunacion } from 'src/app/interfaces/PlanVacunacion';
import { Reserva } from 'src/app/interfaces/Reserva';
import { Ubicacion } from 'src/app/interfaces/Ubicacion';

@Injectable({
  providedIn: 'root'
})
export class ServicioReservasService {

  url_api:string = CompCent.url;

  constructor(private http: HttpClient) { }

  getPlanes(pObjetivo:any, fnac:any){
    return this.http.get<PlanVacunacion>(this.url_api+"planvacunacion/" + pObjetivo + "/" + fnac); 
  }

  getDepartamentos(){
    return this.http.get<Departamento>(this.url_api+"departamentos");
  }

  getUbicaciones(departamento: String){
    if(departamento !== '0'){
      console.log(departamento)
      return this.http.get<Ubicacion>(this.url_api+"departamentos/ubicaciones/"+departamento)
    }
  }

  crearReservar(reserva: Reserva): Observable<any>{
    return this.http.post<Reserva>(this.url_api+"reserva", reserva);
  }

  consultarReservasCiudadano(ci: String){
    return this.http.get<ConsultaReservaCiudadano[]>(this.url_api+`reserva/${ci}`)
  }

  cancelarReserva(id: String){
    return this.http.put<String>(this.url_api+"reserva/cancelar", id);
  }

  getAgendadosHoy(id: any){
    return this.http.get<any>(this.url_api + `reserva/count-agendados/${id}`)
  }
}

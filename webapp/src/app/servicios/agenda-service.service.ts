import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/Departamento';
import { PlanVacunacion } from '../interfaces/PlanVacunacion'
import { Reserva } from '../interfaces/Reserva';
import { Ubicacion } from '../interfaces/Ubicacion';

@Injectable({
  providedIn: 'root'
})
export class AgendaServiceService {


  url_api:string = "http://localhost:8080/comp-cent-web/rest/";

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



}



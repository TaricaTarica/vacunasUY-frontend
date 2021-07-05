import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompCent } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class RegistroVacunaServiceService {

  url_api:string =  CompCent.url + "certificado";

  constructor(private http: HttpClient) { }

  getVacunadosHoy(id: any){
    return this.http.get<any>(this.url_api + "/count-registros/" + id);
  }

  getVacunadosPorMes(id: any, ano: any){
    return this.http.get<any>(this.url_api + "/count-vacunados-mes/" + id + "/" + ano);
  }

  getVacunadosPorDepartamento(id: any, ano: any){
    return this.http.get<any>(this.url_api + "/count-vacunados-departamento/" + id + "/" + ano)
  }
  getCertificados(ci: any){
    return this.http.get<any>(this.url_api + "/ciudadano/" + ci);
  }
  getCertificadoReserva(id: any){
    return this.http.get<any>(this.url_api + "/obtener-certificado-reserva/" + id)
  }
}

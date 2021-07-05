import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompCent } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class VacunadorServiceService {

  url_api:string = CompCent.url;

  constructor(private http: HttpClient) { }

  esVacunador(ci: any){
    return this.http.get<any>(this.url_api + "vacunador/es-vacunador/" + ci);
  }

  puestoVacunador(ci: any, codigo: any){
    return this.http.get<any>(this.url_api + "vacunador/puesto-vacunador/" + ci + "/" + codigo);
  }
  
}

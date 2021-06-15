import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacunadorServiceService {

  url_api:string = "http://localhost:8080/comp-cent-web/rest/";

  constructor(private http: HttpClient) { }

  esVacunador(ci: any){
    return this.http.get<any>(this.url_api + "vacunador/es-vacunador/" + ci)
  }
  
}

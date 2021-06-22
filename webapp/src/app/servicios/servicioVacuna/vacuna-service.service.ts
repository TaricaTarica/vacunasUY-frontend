import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacunaServiceService {

  url_api:string = "http://localhost:8080/comp-cent-web/rest/vacuna";

  constructor(private http: HttpClient) { }

  getVacunas(){
    return this.http.get<any>(this.url_api + "/listar");
  }
}

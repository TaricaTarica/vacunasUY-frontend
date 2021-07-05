import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompCent } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class VacunaServiceService {

  url_api:string = CompCent.url + "vacuna";

  constructor(private http: HttpClient) { }

  getVacunas(){
    return this.http.get<any>(this.url_api + "/listar");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompCent } from '../../globals';
import { Agenda } from 'src/app/interfaces/Agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendasService {

  url_api:string = CompCent.url;
  
  constructor(private http: HttpClient) { }

  getAgendas(){
    return this.http.get<Agenda[]>(this.url_api+"agendas/activas");
  }

  getAgendasActivasHoy(id: any){
    return this.http.get<any>(this.url_api+"agendas/count-activas/" + id);
  }

  getAgendasVacunador(ci: any){
    return this.http.get<Agenda[]>(this.url_api + "agendas/agendas-vacunador/" + ci );
  }

}

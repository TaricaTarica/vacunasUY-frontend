import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agenda } from 'src/app/interfaces/Agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendasService {

  url_api:string = "http://localhost:8080/comp-cent-web/rest/";

  constructor(private http: HttpClient) { }

  getAgendas(){
    return this.http.get<Agenda[]>(this.url_api+"agendas/activas");
  }
}

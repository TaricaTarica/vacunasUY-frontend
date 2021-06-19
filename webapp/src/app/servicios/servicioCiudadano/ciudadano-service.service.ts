import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoServiceService {

  constructor(private http: HttpClient) { }

  url_api:string = "http://localhost:8080/comp-cent-web/rest/";

  existeCiudadano(ci: any){
    return this.http.get<any>(this.url_api + "ciudadano/existe-ciudadano/" + ci);
  }

  obtenerPerfilCiudadano(ci: any){
    return this.http.get<any>(this.url_api + "ciudadano/perfil/" + ci)
  }

  crearCiudadano(usr: Usuario){
    const nombre_completo = usr.nombre_completo.split(" ");

    if(nombre_completo.length == 2){
      var ciudadano = {
        "ci": usr.numero_documento,
        "primerNombre": nombre_completo[0],
        "segundoNombre": " ",
        "primerApellido": nombre_completo[1],
        "segundoApellido": " ",
        "email": usr.email
      }
    }
    else{
      var ciudadano = {
        "ci": usr.numero_documento,
        "primerNombre": nombre_completo[0],
        "segundoNombre": nombre_completo[1],
        "primerApellido": nombre_completo[2],
        "segundoApellido": nombre_completo[3],
        "email": usr.email
      }
    }

    return this.http.post<any>(this.url_api + "ciudadano", ciudadano);
  }

}

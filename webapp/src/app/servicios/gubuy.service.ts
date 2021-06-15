import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks'
import { Usuario } from '../interfaces/Usuario';
import { authConfig } from '../sso.config';
import { CiudadanoServiceService } from './servicioCiudadano/ciudadano-service.service';
import { VacunadorServiceService } from './servicioVacunador/vacunador-service.service';

@Injectable({
  providedIn: 'root'
})
export class GubuyService implements OnInit{
 
  public user: Usuario;
  public existe: boolean;

  constructor(private oauthService: OAuthService, private ciudadanoService: CiudadanoServiceService, private vacunadorService: VacunadorServiceService,
    private route: Router) { 
    
  }

  configureSingleSingOn(){
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.configure(authConfig);    
    this.oauthService
    .loadDiscoveryDocument('/gubuy/.well-known/openid-configuration')
    .then(() => {
      this.oauthService.tokenEndpoint ='/gubuy/token';
      this.oauthService.userinfoEndpoint ='/gubuy/userinfo';
      this.oauthService.tryLogin().then(() => {
        console.log('getAccessToken : ', this.oauthService.hasValidAccessToken()),
        this.oauthService.loadUserProfile().then(user => {
          if(this.oauthService.hasValidAccessToken()){
            //me fijo si el session esta vacio, si esta vacio hago lo de abajo
            if(user != null){
              this.vacunadorService.esVacunador(user.numero_documento).subscribe(esVacunador => {
                this.user = {
                  nombre_completo: user.nombre_completo,
                  email: user.email,
                  numero_documento: user.numero_documento,
                  vacunador: esVacunador
                 }
                 sessionStorage.setItem('userLogged', JSON.stringify(this.user));
                 if(esVacunador == false){
                  this.ciudadanoService.existeCiudadano(this.user.numero_documento).subscribe(data => { 
                    if(data == false){
                      this.route.navigate(['/confirmar-ciudadano']);
                      }
                    });
                 }
              }) 
            }
            else{
              sessionStorage.clear();  
            }
          }
          else{
            sessionStorage.clear();
          }
        });
      });
    })
  }

  ngOnInit(): void {
    //this.configureSingleSingOn();
  }

  login(){
    this.oauthService.initImplicitFlow();
  }
  
  getEmail(): String{
    return this.user.email;
  }
  
}

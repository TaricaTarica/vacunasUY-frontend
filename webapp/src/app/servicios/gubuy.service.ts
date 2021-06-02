import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks'
import { Usuario } from '../interfaces/Usuario';
import { authConfig } from '../sso.config';

@Injectable({
  providedIn: 'root'
})
export class GubuyService implements OnInit{
 
  public user: Usuario;

  constructor(private oauthService: OAuthService) { 
    
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
            if(user != null){
              this.user = {
                nombre_completo: user.nombre_completo,
                email: user.email,
                numero_documento: user.numero_documento
               }
               sessionStorage.setItem('userLogged', JSON.stringify(this.user));
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

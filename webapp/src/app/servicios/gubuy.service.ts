import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../sso.config';

@Injectable({
  providedIn: 'root'
})
export class GubuyService implements OnInit{

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
      this.oauthService.tryLogin();
    }) 
  }

  ngOnInit(): void {
    this.configureSingleSingOn();
  }

  login(){
    this.oauthService.initImplicitFlow();
  }
  userinfo(): any{
    this.oauthService.loadUserProfile();
    let claims = this.oauthService.getIdentityClaims();
    return claims['primer_nombre'];
    /*var nombre; 
    this.oauthService.loadUserProfile().then(user =>{
      console.log(user['nombre_completo']);
      nombre = user['nombre_completo'];
    });
    return nombre; */
  }
}

import { ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks'
import { Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';
import { authConfig } from '../sso.config';

@Injectable({
  providedIn: 'root'
})
export class GubuyService implements OnInit{
 
  public user: Usuario;
  public user$ : Observable<Usuario> = new Observable<Usuario>();
  setUser = new EventEmitter<Usuario>() ;

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
       const hasToken = this.oauthService.hasValidAccessToken();
        if( hasToken ){
          console.log("hasToken", hasToken)
          this.oauthService.loadUserProfile().then(user => {
              
            console.log( user );
            const { nombre_completo, email, numero_documento} = user;
              
              if(user != null){
                this.user = {
                  nombre_completo,
                  email,
                  numero_documento
                 }
                 sessionStorage.setItem('userLogged', JSON.stringify(this.user));
              //   this.user$ = Observable.create( (observer ) => observer.next( this.user ));
              this.setUser.emit( this.user );
                 //this.user$ = of( this.user );
              }
              else{
                sessionStorage.clear();  
              }
          });
        }else{
          sessionStorage.clear();
        }
      });
    })
  }

  ngOnInit(): void {
    
    //this.configureSingleSingOn();
  }

  login(){
    console.log(' login 1');
    
    this.oauthService.initImplicitFlow();
    console.log(' login 2');
  }

  logout(){
    //this.oauthService.logoutUrl = '/gubuy/logout';
    this.oauthService.logOut();
    sessionStorage.clear();
    this.setUser.emit( null );
    console.log("terminó logout");
  }
  
  getEmail(): String{
    return this.user.email;
  }
  
}

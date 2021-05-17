import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from 'src/app/sso.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  userName: any;
  loggedIn: boolean;

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

  logout(){
    this.oauthService.logOut();
  }

  userinfo(){
    //let claims = this.oauthService.getIdentityClaims();
    //console.log(claims['primer_nombre']);
    this.oauthService.loadUserProfile().then(user =>{
      this.userName = user['nombre_completo'];
      //console.log(user);
    });
     console.log(this.oauthService.loadUserProfile());
  }
}

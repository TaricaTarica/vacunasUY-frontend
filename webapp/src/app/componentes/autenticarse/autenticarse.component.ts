import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/sso.config';

@Component({
  selector: 'app-autenticarse',
  templateUrl: './autenticarse.component.html',
  styleUrls: ['./autenticarse.component.css']
})
export class AutenticarseComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
    this.configureSingleSingOn();

  }
  configureSingleSingOn(){
    this.oauthService.initCodeFlow();
    this.oauthService.configure(authConfig);
  }
  ngOnInit(): void {
  }

  login(){
    this.oauthService
    .loadDiscoveryDocument('https://auth-testing.iduruguay.gub.uy/oidc/v1/.well-known/openid-configuration')
    .then(() => this.oauthService.tryLogin());
  }

  logout(){
    this.oauthService.logOut();
  }

  token(){
    console.log( this.oauthService.getAccessToken());
  }

}

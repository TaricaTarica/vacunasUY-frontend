import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { Token } from './interfaces/token';
import { authConfig } from 'src/app/sso.config';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit{

  constructor(private oauthService: OAuthService) {
    this.configureSingleSingOn();

  }
  configureSingleSingOn(){
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.configure(authConfig);    
    this.oauthService
    .loadDiscoveryDocument('http://localhost:8080/gubuy/.well-known/openid-configuration')
    .then(() => {
      this.oauthService.tokenEndpoint ='http://localhost:8080/gubuy/token';
      this.oauthService.userinfoEndpoint ='http://localhost:8080/gubuy/userinfo';
      this.oauthService.tryLogin();
    })    
  }

  ngOnInit(): void {}

  login(){
    this.oauthService.initImplicitFlow();
  }

  logout(){
    this.oauthService.logOut();
  }

  userinfo(){
    console.log(this.oauthService.loadUserProfile())
  }
  
}

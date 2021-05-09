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
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  ngOnInit(): void {
  }

  login(){
    this.oauthService.initLoginFlow();
  }

}

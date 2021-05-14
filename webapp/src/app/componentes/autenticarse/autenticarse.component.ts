import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/sso.config';

@Component({
  selector: 'app-autenticarse',
  templateUrl: './autenticarse.component.html',
  styleUrls: ['./autenticarse.component.css']
})
export class AutenticarseComponent implements OnInit {

  
  ngOnInit(): void {
  }



}

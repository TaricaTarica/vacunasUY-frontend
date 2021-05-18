import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AutenticarseComponent } from './componentes/autenticarse/autenticarse.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { OAuthModule } from 'angular-oauth2-oidc';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { HomeComponent } from './componentes/home/home.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/header/header.component';

import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';




const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'autenticarse', component: AutenticarseComponent },
  { path: 'agendarse', component: AgendaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AutenticarseComponent,
    AgendaComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    RouterModule.forRoot(rutas),
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:8080/gubuy/'],
          sendAccessToken: true
      },
    
  }),
    HttpClientModule,
    BrowserAnimationsModule  
  ],
  providers: [JwksValidationHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }

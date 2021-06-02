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
import { AgendasComponent, modalInfo } from './componentes/agendas/agendas.component';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { confirmarCancelarReserva, ConsultaReservaComponent } from './componentes/consulta-reserva/consulta-reserva.component';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'autenticarse', component: AutenticarseComponent },
  { path: 'agendarse', component: AgendaComponent },
  { path: 'agendas-activas', component: AgendasComponent },
  { path: 'consulta-reserva', component: ConsultaReservaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AutenticarseComponent,
    AgendaComponent,
    HomeComponent,
    HeaderComponent,
    AgendasComponent,
    modalInfo,
    confirmarCancelarReserva,
    ConsultaReservaComponent
  ],
  entryComponents: [
    modalInfo
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
    FormsModule, 
    RouterModule.forRoot(rutas),
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost/gubuy/'],
          sendAccessToken: true
      },
    
  }),
    HttpClientModule,
    BrowserAnimationsModule  
  ],
  providers: [
    JwksValidationHandler,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

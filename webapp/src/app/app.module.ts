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

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/header/header.component';

import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { AgendasComponent, modalInfo } from './componentes/agendas/agendas.component';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { confirmarCancelarReserva, ConsultaReservaComponent } from './componentes/consulta-reserva/consulta-reserva.component';
import { ConfirmarCiudadanoComponent } from './componentes/confirmar-ciudadano/confirmar-ciudadano.component';
import { MonitorVacunacionComponent } from './componentes/monitor-vacunacion/monitor-vacunacion.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { SalaChatComponent } from './componentes/sala-chat/sala-chat.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgendasAsignadasComponent, modalInfoVacunador } from './componentes/agendas-asignadas/agendas-asignadas.component';
import { CertificadoVacunacionComponent } from './componentes/certificado-vacunacion/certificado-vacunacion.component';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ListaCertificadosComponent } from './componentes/lista-certificados/lista-certificados.component';
import { CompCent } from './globals';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'autenticarse', component: AutenticarseComponent },
  { path: 'agendarse', component: AgendaComponent },
  { path: 'agendas-activas', component: AgendasComponent },
  { path: 'consulta-reserva', component: ConsultaReservaComponent },
  { path: 'confirmar-ciudadano', component: ConfirmarCiudadanoComponent },
  { path: 'monitor-vacunacion', component: MonitorVacunacionComponent },
  { path: 'sala-chat', component: SalaChatComponent },
  { path: 'agendas-asignadas', component: AgendasAsignadasComponent },
  { path: 'certificado-vacunacion/:id', component: CertificadoVacunacionComponent },
  { path: 'lista-certificados', component: ListaCertificadosComponent },
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
    modalInfoVacunador,
    confirmarCancelarReserva,
    ConsultaReservaComponent,
    ConfirmarCiudadanoComponent,
    MonitorVacunacionComponent,
    SalaChatComponent,
    AgendasAsignadasComponent,
    CertificadoVacunacionComponent,
    ListaCertificadosComponent
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
          allowedUrls: [ CompCent.domino + '/gubuy/'],
          sendAccessToken: true
      },
  }),
    HttpClientModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
  ],
  providers: [
    JwksValidationHandler,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

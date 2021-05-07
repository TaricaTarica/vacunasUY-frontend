import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AutenticarseComponent } from './componentes/autenticarse/autenticarse.component';
import { Routes, RouterModule } from '@angular/router';

const rutas: Routes = [
  { path: '', component: AppComponent },
  { path: 'autenticarse', component: AutenticarseComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AutenticarseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

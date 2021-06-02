import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { GubuyService } from 'src/app/servicios/gubuy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: Usuario;

  constructor(private gubuy: GubuyService) { }

  ngOnInit(): void {
    this.gubuy.configureSingleSingOn();
    if (sessionStorage['userLogged']) {
      this.user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
    } 
  }
  autenticarse(){
    this.gubuy.login();
  }

}

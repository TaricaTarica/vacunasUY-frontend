import { Component, OnInit } from '@angular/core';
import { GubuyService } from './servicios/gubuy.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  userName: any;

  constructor(private gubuy:GubuyService) {
  }
  
  ngOnInit(): void {
    this.gubuy.configureSingleSingOn();
  }

  login(){
    this.gubuy.login();
  }
  username(){
    console.log(this.gubuy.userinfo());
    this.userName = this.gubuy.userinfo();
  }

}

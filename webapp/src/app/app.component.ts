import { Component, OnInit } from '@angular/core';
import { GubuyService } from './servicios/gubuy.service';
import firebase from 'firebase/app'

const config = {
  apiKey: "AIzaSyBD4Y-vu5sPVpyPagV1-DBVJ5dvjiDb0i0",
  authDomain: "vacunadoreschat.firebaseapp.com",
  databaseURL: "https://vacunadoreschat-default-rtdb.firebaseio.com",
  projectId: "vacunadoreschat",
  storageBucket: "vacunadoreschat.appspot.com",
  messagingSenderId: "529336092533",
  appId: "1:529336092533:web:d297f60c451dd02952b53c"
};

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
    firebase.initializeApp(config);
  }

  login(){
    this.gubuy.login();
  }

}

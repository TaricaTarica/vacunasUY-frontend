import { Component, OnInit } from '@angular/core';
import { GubuyService } from 'src/app/servicios/gubuy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gubuy:GubuyService) { }

  ngOnInit(): void {
  }

}

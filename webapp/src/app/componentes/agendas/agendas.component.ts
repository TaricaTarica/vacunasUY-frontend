import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { Agenda } from 'src/app/interfaces/Agenda';
import { AgendasService } from 'src/app/servicios/servicioAgendas/agendas.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


export interface Planes {
  data:[
    {
        edadMaxima: Number,
        edadMinima: Number,
        enfermedad:          {
            nombre: String
        },

        nombre: String,
        poblacionObjetivo: String
    }
]
}

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {

  constructor(private serviceAgenda: AgendasService, public dialog: MatDialog) { }

  agendas: Array<Agenda> 

  ngOnInit(): void {
    this.serviceAgenda.getAgendas().subscribe(agenda => this.agendas = agenda);
  }

  masInfo(planes: Array<Agenda["listDtPlanVacunacion"]>){
    this.dialog.open(modalInfo, {
      data: {
        data: planes
      }
      
    });
  }

}
@Component({
  selector: 'modalInfo',
  templateUrl: 'modalInfo.html'
})
export class modalInfo {
  constructor(public dialog: MatDialogRef<modalInfo>, @Inject(MAT_DIALOG_DATA)  public data: Planes) {}
  onNoClick(): void {
    this.dialog.close();
  }
}

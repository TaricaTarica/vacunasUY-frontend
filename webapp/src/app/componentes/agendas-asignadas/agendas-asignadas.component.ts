import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/interfaces/Agenda';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AgendasService } from 'src/app/servicios/servicioAgendas/agendas.service';
import { VacunadorServiceService } from 'src/app/servicios/servicioVacunador/vacunador-service.service';
import { Planes } from '../agendas/agendas.component';

@Component({
  selector: 'app-agendas-asignadas',
  templateUrl: './agendas-asignadas.component.html',
  styleUrls: ['./agendas-asignadas.component.css']
})
export class AgendasAsignadasComponent implements OnInit {

  user: Usuario;
  agendas: Array<Agenda> 
  puesto: any

  constructor(
    private router: Router,
    private agendasService: AgendasService,
    public dialog: MatDialog,
    private vacunadorService: VacunadorServiceService){ }

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      this.user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
      if(!this.user.vacunador){
        this.router.navigate(['/']);
      }
      else{
        this.agendasService.getAgendasVacunador(this.user.numero_documento).subscribe(data => {
          this.agendas = data;
        });
      }
    }
    else{
      this.router.navigate(['/']);
    } 
  }
  masInfo(planes: Array<Agenda["listDtPlanVacunacion"]>){
    this.dialog.open(modalInfoVacunador, {
      data: {
        data: planes
      }
      
    });
  }

}


@Component({
  selector: 'modalInfoVacunador',
  templateUrl: '../agendas/modalInfo.html'
})
export class modalInfoVacunador {
  constructor(public dialog: MatDialogRef<modalInfoVacunador>, @Inject(MAT_DIALOG_DATA)  public data: Planes) {}
  onNoClick(): void {
    this.dialog.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaReservaCiudadano } from 'src/app/interfaces/ConsultaReservaCiudadano';
import { ServicioReservasService } from 'src/app/servicios/servicioReservas/servicio-reservas.service';

@Component({
  selector: 'app-consulta-reserva',
  templateUrl: './consulta-reserva.component.html',
  styleUrls: ['./consulta-reserva.component.css']
})
export class ConsultaReservaComponent implements OnInit {

  consultas: Array<ConsultaReservaCiudadano>;
  ci = "12345678"
  
  constructor(private servicioReserva: ServicioReservasService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.servicioReserva.consultarReservasCiudadano(this.ci).subscribe(
      data => this.consultas = data
    );
  }
  cancelarReserva(id: String){
    const dialogRef = this.dialog.open(confirmarCancelarReserva, {
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.id);
      this.servicioReserva.cancelarReserva(result.id).subscribe();
    });
  }
}
@Component({
  selector: 'confirmarCancelarReserva',
  templateUrl: 'confirmarCancelarReserva.html'
})
export class confirmarCancelarReserva {
  constructor(public dialog: MatDialogRef<confirmarCancelarReserva>, @Inject(MAT_DIALOG_DATA)  public data: String) {}
  onNoClick(): void {
    this.dialog.close();
  }
}

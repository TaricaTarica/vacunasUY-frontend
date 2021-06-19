import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaReservaCiudadano } from 'src/app/interfaces/ConsultaReservaCiudadano';
import { Usuario } from 'src/app/interfaces/Usuario';
import { ServicioReservasService } from 'src/app/servicios/servicioReservas/servicio-reservas.service';

declare function toastMensaje(value: any): any;

@Component({
  selector: 'app-consulta-reserva',
  templateUrl: './consulta-reserva.component.html',
  styleUrls: ['./consulta-reserva.component.css']
})
export class ConsultaReservaComponent implements OnInit {

  consultas: Array<ConsultaReservaCiudadano>;
  user: Usuario
  
  constructor(private servicioReserva: ServicioReservasService, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      this.user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
      this.cargarTabla();
    } 
    
  }
  cancelarReserva(id: String){
    const dialogRef = this.dialog.open(confirmarCancelarReserva, {
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.servicioReserva.cancelarReserva(result.id).subscribe(data => {
        toastMensaje(data)
        this.cargarTabla();
      });
      
    });
  }
  cargarTabla(){
    this.servicioReserva.consultarReservasCiudadano(this.user.numero_documento).subscribe(data => {
      this.consultas = data
      this.changeDetectorRefs.detectChanges();
    } 
    );
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

import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { Vacuna } from 'src/app/interfaces/Vacuna';
import { AgendaServiceService } from 'src/app/servicios/agenda-service.service';
import { AgendasService } from 'src/app/servicios/servicioAgendas/agendas.service';
import { RegistroVacunaServiceService } from 'src/app/servicios/servicioRegistroVacuna/registro-vacuna-service.service';
import { ServicioReservasService } from 'src/app/servicios/servicioReservas/servicio-reservas.service';
import { VacunaServiceService } from 'src/app/servicios/servicioVacuna/vacuna-service.service';
import { VacunadorServiceService } from 'src/app/servicios/servicioVacunador/vacunador-service.service';

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
export type ColumnChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-monitor-vacunacion',
  templateUrl: './monitor-vacunacion.component.html',
  styleUrls: ['./monitor-vacunacion.component.css']
})
export class MonitorVacunacionComponent implements OnInit {

  @ViewChild("line-chart") lineChart: ChartComponent;
  @ViewChild("column-chart") columnChart: ChartComponent;
  public lineChartOptions: Partial<LineChartOptions>;
  public columnChartOptions: Partial<ColumnChartOptions>;
  vacunas: Vacuna[] = [];
  vacunaSeleccionada: number;
  anoMesSeleccionado: number;
  anoDepartamentoSeleccionado: number;
  vacunadosHoy: any;
  agendasActivas: any;
  agendadosHoy: any;
  

  constructor(private vacunaService: VacunaServiceService, private registroVacunaService: RegistroVacunaServiceService,
     private agendaService: AgendasService, private reservaService: ServicioReservasService) {
    this.lineChartOptions = {
      series: [
        {
          name: "Vacunados",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        height: 300,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
        ]
      }
    };

    this.columnChartOptions = {
        series: [
          {
            name: "Vacunados",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "ARTIGAS",
            "CANELONES",
            "CERRO LARGO",
            "COLONIA",
            "DURAZNO",
            "FLORIDA",
            "FLORES",
            "LAVALLEJA",
            "MALDONADO",
            "MONTEVIDEO",
            "PAYSANDÚ",
            "RÍO NEGRO",
            "ROCHA",
            "RIVERA",
            "SALTO",
            "SAN JOSÉ",
            "SORIANO",
            "TACUAREMBÓ",
            "TREINTA Y TRES"
          ]
        },
        yaxis: {
          title: {
            text: "Personas vacunadas"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " vacunados";
            }
          }
        }
      };
  }

  ngOnInit(): void {
    this.vacunaService.getVacunas().subscribe(data => {
      for(let v in data){
        var vac: Vacuna = {
          id: data[v].id,
          nombre: data[v].nombre
        }
        this.vacunas.push(vac);
      }
      this.vacunaSeleccionada = this.vacunas[0].id;
      this.anoMesSeleccionado = 2021;
      this.anoDepartamentoSeleccionado = 2021;
      this.capturarVacuna();
    })
    
  }

  capturarVacuna(){
    console.log("capturarVacuna: ",this.vacunaSeleccionada);
    this.capturarAnoMes();
    this.capturarAnoDepartamento();

    this.registroVacunaService.getVacunadosHoy(this.vacunaSeleccionada).subscribe(data => {
      this.vacunadosHoy = data;
      this.agendaService.getAgendasActivasHoy(this.vacunaSeleccionada).subscribe(data => {
        this.agendasActivas = data;
        this.reservaService.getAgendadosHoy(this.vacunaSeleccionada).subscribe(data => {
          this.agendadosHoy = data;
        })
      })
    })
  }

  capturarAnoMes(){
    console.log("Año x mes: ",this.anoMesSeleccionado);
    console.log("capturarAnoMes: ",this.vacunaSeleccionada);

    this.registroVacunaService.getVacunadosPorMes(this.vacunaSeleccionada, this.anoMesSeleccionado).subscribe(data =>{
      this.lineChartOptions = {
        series: [
          {
            name: "Vacunados",
            data: data
          }
        ],
        chart: {
          height: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
          ]
        }
      };
    })
  }

  capturarAnoDepartamento(){
    console.log("Año x departamento: ",this.anoDepartamentoSeleccionado);
    console.log("capturarAnoDepartamento: ",this.vacunaSeleccionada);

    this.registroVacunaService.getVacunadosPorDepartamento(this.vacunaSeleccionada, this.anoDepartamentoSeleccionado).subscribe(data => {
      console.log(data);
      this.columnChartOptions = {
        series: [
          {
            name: "Vacunados",
            data: data
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "ARTIGAS",
            "CANELONES",
            "CERRO LARGO",
            "COLONIA",
            "DURAZNO",
            "FLORIDA",
            "FLORES",
            "LAVALLEJA",
            "MALDONADO",
            "MONTEVIDEO",
            "PAYSANDÚ",
            "RÍO NEGRO",
            "ROCHA",
            "RIVERA",
            "SALTO",
            "SAN JOSÉ",
            "SORIANO",
            "TACUAREMBÓ",
            "TREINTA Y TRES"
          ]
        },
        yaxis: {
          title: {
            text: "Personas vacunadas"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " vacunados";
            }
          }
        }
      };
    })

  }


}

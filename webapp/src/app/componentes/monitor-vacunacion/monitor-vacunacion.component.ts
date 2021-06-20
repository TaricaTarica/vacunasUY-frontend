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
  vacunas: String[] = [];
  vacunaSeleccionada: String

  constructor() {
    this.lineChartOptions = {
      series: [
        {
          name: "Vacunados",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 10, 99, 21]
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
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 10, 29, 32, 32, 42, 21, 34, 21, 23, 34]
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
    this.vacunas = ["covid", "vacuna3", "vacuna4", "vacuna5"]
  }

}

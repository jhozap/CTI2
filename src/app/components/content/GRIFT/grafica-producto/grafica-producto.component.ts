import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Chart from "chart.js";
import { ChartDTO, DataChart, DataSet, OptionsChart, labels, titleChart, legend } from 'src/app/models/chart.model';

@Component({
  selector: 'app-grafica-producto',
  templateUrl: './grafica-producto.component.html',
  styleUrls: ['./grafica-producto.component.scss']
})
export class GraficaProductoComponent implements OnInit {
  titleForm = "Grafica de producto investigacion";

  graficas: any;
  tipo: any[];
  datos: any[];

  public myChart: Chart

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.graficas = new Array<ChartDTO>();
    this.tipo = ["Tortas", "Barras"];
    this.graficarInvestigacionesInstitucionales();

  }


  graficarInvestigacionesInstitucionales(){
    this.cd.detectChanges();
    this.graficas[0] = new ChartDTO();
    this.graficas[0].canvas = document.getElementById("investigacionesProductosChart");
    this.graficas[0].ctx = this.graficas[0].canvas.getContext("2d");
    this.graficas[0].type = "pie";
    this.graficas[0].data = this.generarDataSetInvestigaciones();
    this.graficas[0].options = this.generarOpciones();
    if(this.myChart != undefined){
      this.myChart.destroy();
    }
    
     this.myChart = new Chart(this.graficas[0].ctx, this.graficas[0]);
     this.myChart.update();

    this.cd.detectChanges();
  }

  generarDataSetInvestigaciones(){
    let data = new DataChart();
    data.labels = this.generarLabels();
    let dataSet = new DataSet();

    dataSet.label = "Producto de la Investigación";
    dataSet.data = this.generarDataSetsData();
    dataSet.backgroundColor = ["green","blue","red","yellow","orange","black","white",
    "pink","purple","gold"];
    data.datasets = [];
    data.datasets.push(dataSet);
    return data;
  }

  generarDataSetInvestigacionesTorta(){
    let data = new DataChart();
    data.labels = this.generarLabels();
    let dataSet = new DataSet();

    dataSet.label = "Producto de la Investigación";
    dataSet.data = this.datos;
    dataSet.backgroundColor = ["green","blue","red","yellow","orange","black","white",
    "pink","purple","gold"];
    data.datasets = [];
    data.datasets.push(dataSet);
    return data;
  }

  generarDataSetInvestigacionesBarras(){
    let data = new DataChart();
    data.labels = this.generarLabels();
    let dataSet = new DataSet();

    dataSet.label = "Cantidad de Investigaciones";
    dataSet.data = this.datos;
    dataSet.backgroundColor =  ["green","green","green","green","green",
    "green","green","green","green","green"];
    data.datasets = [];
    data.datasets.push(dataSet);
    return data;
  }

  generarDataSetsData() {
    let data = [Math.floor(Math.random() * 6) + 1  ,
      Math.floor(Math.random() * 8) + 1  ,
      Math.floor(Math.random() * 6) + 1  ,
      Math.floor(Math.random() * 50) + 1  ,
      Math.floor(Math.random() * 30) + 1  ,
      Math.floor(Math.random() * 10) + 1  ,
      Math.floor(Math.random() * 4) + 1  ,
      Math.floor(Math.random() * 9) + 1  ,
      Math.floor(Math.random() * 15) + 1  ,
      Math.floor(Math.random() * 10) + 1 ];
      this.datos = data;
    return data;
  }


  generarLabels() {
    let labels = [
      "GUIA",
      "CARTILLA",
      "PROTOTIPO",
      "LIBRO",
      "ARTICULO",
      "LIBRO",
      "CAPITULO DEL LIBRO",
      "MANUALES",
      "PROCEDIMIENTOS",
      "INSTRUCTIVOS"
    ];
    return labels;
  }


  generarOpciones() {
    let option = new OptionsChart();
    option.display = true;
    let labelOpt = new labels();
    let title = new titleChart();
    let legen = new legend();
    legen.display = true;
    title.display = true;
    title.text = "";
    option.responsive = true;
    option.title = title;
    legen.labels = labelOpt;
    option.legend = legen;


    return option;
  }

  buscar() {

    this.ngOnInit();
  }

  cambiar(tipo) {
    console.log(tipo);
    if(tipo === 'Barras'){
      this.cd.detectChanges();
      this.graficas[0] = new ChartDTO();
      this.graficas[0].canvas = document.getElementById("investigacionesProductosChart");
      this.graficas[0].ctx = this.graficas[0].canvas.getContext("2d");
      this.graficas[0].type = "bar";
      this.graficas[0].data = this.generarDataSetInvestigacionesBarras();
      this.graficas[0].options = this.generarOpciones();
      this.myChart.destroy();
       this.myChart = new Chart(this.graficas[0].ctx, this.graficas[0]);
      this.myChart.update();
      this.cd.detectChanges();
    } else{
      this.cd.detectChanges();
      this.graficas[0] = new ChartDTO();
      this.graficas[0].canvas = document.getElementById("investigacionesProductosChart");
      this.graficas[0].ctx = this.graficas[0].canvas.getContext("2d");
      this.graficas[0].type = "pie";
      this.graficas[0].data = this.generarDataSetInvestigacionesTorta();
      this.graficas[0].options = this.generarOpciones();
      this.myChart.destroy();
      this.myChart = new Chart(this.graficas[0].ctx, this.graficas[0]);
      this.myChart.update();
      this.cd.detectChanges();
    }

  }

}

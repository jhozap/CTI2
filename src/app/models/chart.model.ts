export class ChartDTO {
    canvas: any;
    ctx: any;
    type: string;
    data: DataChart;
    options: OptionsChart;
  }
  
  export class DataChart {
    labels: string[];
    datasets: DataSet[];
  }
  
  export class DataSet {
    label: string;
    data: any[];
    backgroundColor: string[];
    lineTension: number;
    fill: boolean;
    borderColor: string;
    borderWidth: number;
    hoverBackgroundColor: string;
  }
  
  export class OptionsChart {
    display: boolean;
    responsive: boolean;
    title: titleChart;
    legend: legend;
    scales: any;
    tooltips: any;
    animation: any;
    maintainAspectRatio: boolean;
  }
  
  export class titleChart {
    display: boolean;
    text: string;
  }
  
  export class legend {
    display: boolean;
    labels: labels;
  }
  
  export class labels {
    fontColor: string;
  }
  
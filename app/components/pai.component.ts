import {Component, OnInit,OnChanges, SimpleChange} from '@angular/core';
import { CHART_DIRECTIVES }                        from 'angular2-highcharts';


@Component({
    selector: 'pie-chart',
    directives: [CHART_DIRECTIVES],
    template: `
        <chart *ngIf="query.type=='ALL' || query.type=='areaInSqKm'" [options]="options"  class='chart'></chart>
        <chart *ngIf="query.type=='ALL' || query.type=='population'" [options]="anotherOption"  class='chart'></chart>
    `,
    inputs:['pieData','query']
})
export class PieChartExample implements OnInit,OnChanges{
    pieData:any[];
    query:any;
    options: Object;
    sizeData:any[]=[];
    populationData: any[]=[];
    renderData:any[];
    anotherOption:Object;

    ngOnInit(){
      let totalForSize =0;
      let totalPopulation =0;
      this.pieData.forEach((ele)=>{
        totalForSize+= Number(ele.areaInSqKm)
        totalPopulation+= Number(ele.population)
      })
      this.sizeData=[]
      this.populationData=[]
      this.pieData.forEach((item)=>{
        this.sizeData.push({name:item.countryName,y:Number((Number(item.areaInSqKm)/totalForSize*100).toFixed(2))})
        this.populationData.push({name:item.countryName,y:Number((Number(item.population)/totalPopulation*100).toFixed(2))})
      })
      this.options= this.caculateOption(this.sizeData,'areaInSqKm')
      this.anotherOption= this.caculateOption(this.populationData,'population')
    }
    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
      if(changes['query']){
        this.ngOnInit()
      }
    }
    caculateOption(value,pietitle){
      return {
          title : { text : pietitle },
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: ('red' && 'whit') || 'black'
                  }
              }
            }
          },
          series: [{
            name: 'Brands',
            colorByPoint: true,
            data: value
          }]
      };
    }
}

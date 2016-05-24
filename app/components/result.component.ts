import {Component,OnInit,OnChanges,SimpleChange} from '@angular/core';
import {SortPipe} from './sort.pipe';
import {PieChartExample} from './pai.component';

@Component({
    selector: 'my-result',
    template: `
    <div class='tablewrapper'>
    <table>
      <tr>
        <th>Continent</th>
        <th>Country</th>
        <th *ngIf="type=='areaInSqKm' || type=='ALL'" (click)='sortTable("areaInSqKm")'>AreaInSqKm (click me)</th>
        <th *ngIf="type=='population' || type=='ALL'" (click)='sortTable("population")'>Population (click me)</th>
      </tr>
      <tr *ngFor="#item of filtered | sortBy:sortedBy ">
        <td >{{item.continent}}</td>
        <td>{{item.countryName}}</td>
        <td *ngIf="type=='areaInSqKm' || type=='ALL'">{{item.areaInSqKm}}</td>
        <td *ngIf="type=='population' || type=='ALL'">{{item.population}}</td>
      </tr>
      <tr>
        <td colspan="2">Total:</td>
        <td *ngIf="type=='areaInSqKm' || type=='ALL'" (click)='sortTable("areaInSqKm")'>{{totalSize}}</td>
        <td *ngIf="type=='population' || type=='ALL'" (click)='sortTable("population")'>{{totalPopulation}}</td>
      </tr>
    </table>
    </div>
    <pie-chart [pieData]="(filtered | sortBy:sortedBy).slice(0,num)" [pietitle]="type" [num]='num' [continentCode]='continentCode'></pie-chart>
    `,
    inputs: ['filtered','type','num','continentCode'],
    pipes:[SortPipe],
    directives:[PieChartExample]
})
export class ResultComponent implements OnInit, OnChanges{
  filtered: any[];
  sortedBy:string;
  pieData:any[];
  type:string;
  num:number;
  totalPopulation:number;
  totalSize:number;
  sortTable(value){
    this.sortedBy=value
  }
  ngOnInit() {
    let siezeTotal=0
    let sizePopulation=0
    this.filtered.forEach((item)=>{
      siezeTotal+= Number(item.areaInSqKm)
      sizePopulation+= Number(item.population)
    })
    this.totalPopulation= sizePopulation
    this.totalSize = siezeTotal
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
  for (let propName in changes) {
    this.ngOnInit()
  }
}


}

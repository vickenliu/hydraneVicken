import {Component,OnInit,OnChanges,SimpleChange} from '@angular/core';
import {SortPipe} from './sort.pipe';

@Component({
    selector: 'my-result',
    template: `
    <table>
      <tr>
        <th>Continent</th>
        <th>Country</th>
        <th *ngIf="type=='areaInSqKm' || type=='ALL'" (click)='sortTable("areaInSqKm")'>AreaInSqKm (click me)</th>
        <th *ngIf="type=='population' || type=='ALL'" (click)='sortTable("population")'>Population (click me)</th>
      </tr>
      <tr *ngFor="#item of filtered.slice(0,num) | sortBy:sortedBy ">
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
    `,
    inputs: ['filtered','type','num'],
    pipes:[SortPipe]
})
export class ResultComponent implements OnInit, OnChanges{
  filtered: any[];
  sortedBy:string;
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
    this.filtered.slice(0,this.num).forEach((item)=>{
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

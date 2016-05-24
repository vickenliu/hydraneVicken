import {Component} from '@angular/core';
import {LoadDataService} from './loadData';
import {SearchComponent} from './search.component';
import {FilterPipe} from './filter.pipe';
import {ResultComponent} from './result.component';


@Component({
    selector: 'my-app',
    template: `
        <button (click)="onClick()" class='btn btn-lg btn-info'>GO</button>
        <my-search [continents]="continents" (childChanged)="updateQuery($event)"></my-search>
        <h2 *ngIf='loading'>Loading Data...</h2>
        <my-result *ngIf="data" [type]='selectedType' [num]='selectedNum' [filtered]="data | search:selectedContinent" [continentCode]='selectedContinent'></my-result>
    `,
    providers:[LoadDataService],
    directives:[SearchComponent,ResultComponent],
    pipes:[FilterPipe]
})
export class AppComponent {
  data: any;
  loading: boolean= false;
  continents: string[];
  selectedContinent: string;
  selectedType: string= 'ALL';
  selectedNum: number= 5;
  constructor(private _loadDataService: LoadDataService){}
  onClick(){
    let that= this;
    this.loading=true;
    this._loadDataService.loadAll().subscribe(
      (data) => {
        that.data= data.geonames.map(obj=>{
            return {
              continent:obj.continent,
              population:obj.population,
              areaInSqKm:obj.areaInSqKm,
              countryName:obj.countryName
            }
        })
        this.loading =false;
        that.getContinents()
      },
      err => alert(err),
      () => console.log('Finished')
    )
  }
  getContinents(){
    let selected=[]
    this.data.forEach(item=>{
      selected.indexOf(item.continent)<0? selected.push(item.continent) : selected;
    })
    this.continents= selected.sort();
    console.log('consdfs',this.continents)
  }
  updateQuery(value){
    if(value.hasOwnProperty('continent')){
      this.selectedContinent= value['continent']
    }else if(value.hasOwnProperty('type')){
      this.selectedType= value['type']
    }else if(value.hasOwnProperty('num')){
      this.selectedNum= Number(value['num'])
    }
  }
}

import {Component}       from '@angular/core';
import {LoadDataService} from './loadData';
import {SearchComponent} from './search.component';
import {FilterPipe}      from './filter.pipe';
import {ResultComponent} from './result.component';


@Component({
    selector: 'my-app',
    template: `
        <button (click)="onClick()" >GO</button>
        <my-search [continents]="continents" (childChanged)="updateQuery($event)"></my-search>
        <h2 *ngIf='loading'>Loading Data...</h2>
        <my-result *ngIf="data" [query]='query' [filtered]="data | search:query.continentCode"></my-result>
    `,
    providers:[LoadDataService],
    directives:[SearchComponent,ResultComponent],
    pipes:[FilterPipe]
})
export class AppComponent {
  data: any;
  query ={
    num:5,
    continentCode:'ALL',
    type:'ALL'
  };
  loading: boolean= false;
  continents: string[];
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
  }
  updateQuery(value){
    this.query=(<any>Object).assign({},this.query,value);
  }
}

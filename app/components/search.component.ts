import {Component,EventEmitter} from '@angular/core';

@Component({
    selector: 'my-search',
    template: `
    <div class='filter'>
      <div class='inputGroup'>
        <label>Continent</label>
        <select (change)="codeChange($event.target.value)">
          <option value="ALL">ALL</option>
          <option *ngFor="#continent of continents" value={{continent}}>{{continent}}</option>
        </select>
      </div>
      <div class='inputGroup'>
        <label>AreaInSqKm/Population</label>
        <select (change)="typeChange($event.target.value)">
          <option value="ALL">ALL</option>
          <option value="areaInSqKm">areaInSqKm</option>
          <option value="population">population</option>
        </select>
      </div>
      <div class='inputGroup'>
        <label>Rows</label>
        <select (change)="numChange($event.target.value)">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
    `,
    inputs: ['continents'],
    outputs:['childChanged']
})
export class SearchComponent {
  continents: string[];
  childChanged= new EventEmitter<any>();
  codeChange(value:string){
    this.childChanged.emit({continent:value})
  }
  typeChange(value){
    this.childChanged.emit({type:value})
  }
  numChange(value){
    this.childChanged.emit({num:value})
  }
}

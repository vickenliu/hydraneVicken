import {Injectable} from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class LoadDataService {
  constructor(private _http: Http){}
  loadAll():any{
    return  this._http.get('/hydraneData') // heroku (https) doesnt allow to recieve data from http api
         .map(res => res.json())           // try to get data through backend
  }
}

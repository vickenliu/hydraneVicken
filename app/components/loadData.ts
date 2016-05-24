import {Injectable} from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class LoadDataService {
  constructor(private _http: Http){}
  loadAll():any{
    return  this._http.get('http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane')
         .map(res => res.json())
  }
}

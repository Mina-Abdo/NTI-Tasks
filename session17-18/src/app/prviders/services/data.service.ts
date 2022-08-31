import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http:HttpClient) { }

  getDatafromApi():Observable<any>{
    return this._http.get("http://localhost:3000/item/all")
  }
  getSingleItem(id:string){
    return this._http.get(`http://localhost:3000/item/single/${id}`)
  }
}

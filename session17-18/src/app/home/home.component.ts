import { Component, OnInit } from '@angular/core';
import { DataService } from '../prviders/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items:any [] = []
  // isLoaded:boolean = false
  constructor(private _data:DataService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this._data.getDatafromApi().subscribe(
      data=>{
        // console.log(data);
        this.items=data.data
        
      },
      e=>{console.log(e.message)},
      ()=>{
        // this.isLoaded=true
      }
    )
  }

}

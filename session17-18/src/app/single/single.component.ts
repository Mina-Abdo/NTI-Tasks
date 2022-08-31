import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../prviders/services/data.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  id:any
  item:any = {}
  constructor(private _activedRoute:ActivatedRoute , private _data:DataService) { }

  ngOnInit(): void {
    this.id = this._activedRoute.snapshot.params["id"]
    this.getSingle(this.id)
  }
  getSingle(id:any){
    this._data.getSingleItem(id).subscribe(
      res=>{console.log(res);
      },
      e=>{console.log(e.message);
      },
      ()=>{}
    )
  }
}

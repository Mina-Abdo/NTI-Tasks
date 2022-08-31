import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl='http://localhost:3000/item/'
  constructor(private _http:HttpClient) { }
//   router.post("/create" , authenticate , adminAuth , itemController.createItem)
  createItem(data:Item):Observable<any>{
    return this._http.post(`${this.baseUrl}create` , data)
  }
// router.post("/addItem/:id" , authenticate , itemController.addItem)
  addItem(data:Item , id:any):Observable<any>{
    return this._http.post(`${this.baseUrl}addItem/${id}` , data)
  }
// router.post("/admin/upImg/:id" , authenticate , adminAuth , upload.single("itemImg"), itemController.upImg)
  upImg(data:Item , id:any):Observable<any>{
    return this._http.post(`${this.baseUrl}admin/upImg/${id}` , data)
  }
// router.get("/getItemByCategory" , authenticate , itemController.getItemByCategory)
  itemByCategory():Observable<any>{
    return this._http.get(`${this.baseUrl}getItemByCategory`)
  }
// router.delete("/deleteCategoryItems" , authenticate , adminAuth , itemController.deleteCategoryItems) 
  deleteCategoryItems():Observable<any>{
    return this._http.delete(`${this.baseUrl}deleteCategoryItems`)
  }
// router.delete("/deleteItemOwner/:id" , authenticate , itemController.deleteItemOwner)
  deleteItemOwner(id:any):Observable<any>{
    return this._http.delete(`${this.baseUrl}deleteItemOwner/${id}`)
  }
// router.patch("/editItem/admin/:id" , authenticate , adminAuth , itemController.editItemByAdmin)
  editItem(id:any , data:Item):Observable<any>{
    return this._http.patch(`${this.baseUrl}editItem/admin/${id}` , data)
  }
// router.get("/all" , itemController.allItems)
  allItems():Observable<any>{
    return this._http.get(`${this.baseUrl}all`)
  }
// router.get("/single/:id" , itemController.singleItem )
  singleItem(id:any ):Observable<any>{
    return this._http.get(`${this.baseUrl}single/${id}`)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Addresse } from 'src/app/models/addresse';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl='http://localhost:3000/user/'
  constructor(private _http:HttpClient) { }
//   router.post("/register" , userController.create)
  register(data:User):Observable<any>{
    return this._http.post(`${this.baseUrl}register` , data)
  }
// router.get("/admin" , authenticate , adminAuth , userController.showAll) //not working properly
  allUsers():Observable<any>{
    return this._http.get(`${this.baseUrl}admin` )
  }
// router.get("/profile" , authenticate, userController.profile)
  profile():Observable<any>{
    return this._http.get(`${this.baseUrl}profile`)
  }
// router.delete("/delete" , authenticate  , userController.deleteProfile)
  deleteUser():Observable<any>{
    return this._http.delete(`${this.baseUrl}delete` )
  }
// router.delete("/admin/delete/:id" , authenticate , adminAuth , userController.adminDeleteProfile)
  adminDeleteUser(id:any):Observable<any>{
    return this._http.delete(`${this.baseUrl}admin/delete/${id}`)
  }
// router.patch("/edit" , authenticate , userController.editProfile)
  editUser(data:User):Observable<any>{
    return this._http.patch(`${this.baseUrl}edit` , data)
  }
// router.post("/addAddr" , authenticate , userController.addAddr)
  addAddr(data:User):Observable<any>{
    return this._http.post(`${this.baseUrl}addAddr` , data)
  }
// router.patch("/editAddr/:id" , authenticate , userController.editAddr)
  editAddr(data:Addresse , id:any):Observable<any>{
    return this._http.patch(`${this.baseUrl}editAddr/${id}` , data)
  }
// router.get("/logout" , authenticate , userController.logout)
  logout():Observable<any>{
    return this._http.get(`${this.baseUrl}logout` )
  }
// router.get("/logoutAll" , authenticate , userController.logoutAll)
  logoutAll():Observable<any>{
    return this._http.get(`${this.baseUrl}logoutAll`)
  }
}

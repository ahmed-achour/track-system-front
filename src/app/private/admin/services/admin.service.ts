import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Admin } from '../models/admin';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _adminUrl = `${environment.apiUrl}/admins/`;
  constructor(private http: HttpClient, private _router: Router) {}
  login(admin: Admin) {
    return this.http.post<any>(this._adminUrl + 'login', admin, {
      observe: 'response',
    });
  }
  addAdmin(admin: Admin) {
    return this.http.post<any>(this._adminUrl, admin);
  }
  allAdmins() {
    return this.http.get<any>(this._adminUrl);
  }
  allStats(selectedYearUser:string,selectedYearDriver:string) {
    return this.http.get<any>(this._adminUrl+'stats/'+selectedYearUser+'/'+selectedYearDriver);
  }
  getOneAdmin(_id: string) {
    return this.http.get<any>(this._adminUrl + _id);
  }
  updateAdmin(_id: string, admin: any) {
    return this.http.patch<any>(this._adminUrl + _id, admin);
  }
  deleteAdmin(_id: string) {
    return this.http.delete<any>(this._adminUrl + _id);
  }
  saveToken() {
    let token = localStorage.getItem('token');
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
      if (decodedToken.role == 'ADMIN') {
        this._router.navigate(['/admin/admins']);
      }
    }
  }
   getRole():string{
    let token = localStorage.getItem('token');
    let role =""
    let decodedToken: any;
    if (token) {
      decodedToken = jwt_decode(token);
      role = decodedToken.role
  }
  return role;
}
getId():string{
  let token = localStorage.getItem('token');
  let id =""
  let decodedToken: any;
  if (token) {
    decodedToken = jwt_decode(token);
    id = decodedToken.id
}
return id;
}
}

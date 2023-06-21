import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private _productUrl = `${environment.apiUrl}/drivers/`;
  constructor(private _http: HttpClient) {}
  addDriver(product: Driver) {
    return this._http.post<any>(this._productUrl, product);
  }
  allDriver() {
    return this._http.get<any>(this._productUrl);
  }
  getDriversByType(type:string){
    return this._http.get<any>(this._productUrl +'category/'+ type);
  }
  getOneDriver(id: string) {
    return this._http.get<any>(this._productUrl + id);
  }
  updateDriver(id: string, data: Driver) {
    return this._http.patch<any>(this._productUrl + id, data);
  }
  deleteDriver(id: string) {
    return this._http.delete<any>(this._productUrl + id);
  }
}

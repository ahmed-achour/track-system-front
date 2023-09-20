import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private _driverUrl = `${environment.apiUrl}/drivers/`;
  constructor(private _http: HttpClient) {}
  addDriver(product: Driver) {
    return this._http.post<any>(this._driverUrl, product);
  }
  allDriver() {
    return this._http.get<any>(this._driverUrl);
  }
  getOneDriver(id: string) {
    return this._http.get<any>(this._driverUrl + id);
  }
  updateDriver(id: string, data: Driver) {
    return this._http.patch<any>(this._driverUrl + id, data);
  }
  deleteDriver(id: string) {
    return this._http.delete<any>(this._driverUrl + id);
  }
  updateDriverStatus(id: string, data: any) {
    return this._http.patch<any>(this._driverUrl + id, data);
  }
}

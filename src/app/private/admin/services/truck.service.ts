import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private _productUrl = `${environment.apiUrl}/trucks/`;
  constructor(private _http: HttpClient) {}
  addTruck(product: any) {
    return this._http.post<any>(this._productUrl, product);
  }
  allTruck() {
    return this._http.get<any>(this._productUrl);
  }
  getOneTruck(id: string) {
    return this._http.get<any>(this._productUrl + id);
  }
  updateTruck(id: string, data: any) {
    return this._http.patch<any>(this._productUrl + id, data);
  }
  deleteTruck(id: string) {
    return this._http.delete<any>(this._productUrl + id);
  }
}

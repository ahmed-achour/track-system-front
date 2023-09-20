import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _routeUrl = `${environment.apiUrl}/routes/`;
  constructor(private _http: HttpClient) {}
  addRoute(route: any) {
    return this._http.post<any>(this._routeUrl, route);
  }
  allRoute() {
    return this._http.get<any>(this._routeUrl);
  }
  getOneRoute(id: string) {
    return this._http.get<any>(this._routeUrl + id);
  }
  updateRoute(id: string, data: any) {
    return this._http.patch<any>(this._routeUrl + id, data);
  }
  deleteRoute(id: string) {
    return this._http.delete<any>(this._routeUrl + id);
  }
  updateRouteStatus(id: string, data: any) {
    return this._http.patch<any>(this._routeUrl + id, data);
  }
}

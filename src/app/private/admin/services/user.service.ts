import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userUrl = `${environment.apiUrl}/users/`;
  constructor(private _http: HttpClient) {}
  addUser(user: User) {
    return this._http.post<any>(this._userUrl, user);
  }
  allUsers() {
    return this._http.get<any>(this._userUrl);
  }
  getOneUser(_id: string) {
    return this._http.get<any>(this._userUrl + _id);
  }
  updateUser(_id: string, user: any) {
    return this._http.patch<any>(this._userUrl + _id, user);
  }
  deleteUser(_id: string) {
    return this._http.delete<any>(this._userUrl + _id);
  }
}

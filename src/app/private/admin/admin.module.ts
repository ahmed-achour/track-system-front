import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import { GoogleMapsModule } from '@angular/google-maps';

import { AdminAddComponent } from './pages/admin/admin-add/admin-add.component';
import { AdminUpdateComponent } from './pages/admin/admin-update/admin-update.component';
import { AdminListComponent } from './pages/admin/admin-list/admin-list.component';
import { AddDriverComponent } from './pages/driver/add-driver/add-driver.component';
import { ListDriverComponent } from './pages/driver/list-driver/list-driver.component';
import { UpdateDriverComponent } from './pages/driver/update-driver/update-driver.component';
import { SingleDriverComponent } from './pages/driver/single-driver/single-driver.component';
import { AddTruckComponent } from './pages/truck/add-truck/add-truck.component';
import { ListTruckComponent } from './pages/truck/list-truck/list-truck.component';
import { SingleTruckComponent } from './pages/truck/single-truck/single-truck.component';
import { UpdateTruckComponent } from './pages/truck/update-truck/update-truck.component';
import { UpdateMessageComponent } from './pages/message/update-message/update-message.component';
import { AddMessageComponent } from './pages/message/add-message/add-message.component';
import { SingleMessageComponent } from './pages/message/single-message/single-message.component';
import { ListMessageComponent } from './pages/message/list-message/list-message.component';



@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    UserAddComponent,
    UserUpdateComponent,

    AdminAddComponent,
    AdminUpdateComponent,
    AdminListComponent,
    AddDriverComponent,
    ListDriverComponent,
    UpdateDriverComponent,
    SingleDriverComponent,
    AddTruckComponent,
    ListTruckComponent,
    SingleTruckComponent,
    UpdateTruckComponent,
    UpdateMessageComponent,
    AddMessageComponent,
    SingleMessageComponent,
    ListMessageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    SharedModule,
    SweetAlert2Module.forRoot(),
    NgbPaginationModule,
  ]
})
export class AdminModule { }

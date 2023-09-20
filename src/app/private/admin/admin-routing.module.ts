import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminAddComponent } from './pages/admin/admin-add/admin-add.component';
import { AdminListComponent } from './pages/admin/admin-list/admin-list.component';
import { AdminUpdateComponent } from './pages/admin/admin-update/admin-update.component';


import { LoginComponent } from './pages/login/login.component';

import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import { ListDriverComponent } from './pages/driver/list-driver/list-driver.component';
import { AddDriverComponent } from './pages/driver/add-driver/add-driver.component';
import { UpdateDriverComponent } from './pages/driver/update-driver/update-driver.component';
import { ListTruckComponent } from './pages/truck/list-truck/list-truck.component';
import { AddTruckComponent } from './pages/truck/add-truck/add-truck.component';
import { UpdateTruckComponent } from './pages/truck/update-truck/update-truck.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarteComponent } from './pages/carte/carte.component';
import { AddRouteComponent } from './pages/routes/add-route/add-route.component';
import { UpdateRouteComponent } from './pages/routes/update-route/update-route.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'carte',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: CarteComponent,
          },
          {
            path: 'add',
            component: AddRouteComponent,
          },
          {
            path: 'update/:id',
            component: UpdateRouteComponent,
          },
            
          ]
      },
      {
        path: 'admins',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: AdminListComponent,
          },
          {
            path: 'add',
            component: AdminAddComponent,
          },
          {
            path: 'update/:id',
            component: AdminUpdateComponent,
          },
        ],
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: UserListComponent,
          },
          {
            path: 'add',
            component: UserAddComponent,
          },
          {
            path: 'update/:id',
            component: UserUpdateComponent,
          },
        ],
      },
     
      {
        path: 'trucks',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ListTruckComponent,
          },
          {
            path: 'add',
            component: AddTruckComponent,
          },
          {
            path: 'update/:id',
            component: UpdateTruckComponent,
          },
         
        ],
      },
      {
        path: 'drivers',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ListDriverComponent,
          },
          {
            path: 'add',
            component: AddDriverComponent,
          },
          {
            path: 'update/:id',
            component: UpdateDriverComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

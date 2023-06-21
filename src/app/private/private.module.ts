import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    AdminModule,
    SharedModule
  ]
})
export class PrivateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Page404Component } from './page404/page404.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@NgModule({
  declarations: [SideBarComponent, NavBarComponent, Page404Component, ImageViewerComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [SideBarComponent, NavBarComponent, Page404Component,Page404Component,ImageViewerComponent],
})
export class SharedModule {}

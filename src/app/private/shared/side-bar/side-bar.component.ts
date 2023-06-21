import { Component, OnInit } from '@angular/core';
import { AdminService } from '@private/admin/services/admin.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  role = ""

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.role = this._adminService.getRole();
  }

}

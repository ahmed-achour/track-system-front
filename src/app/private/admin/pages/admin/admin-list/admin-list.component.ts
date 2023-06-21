import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
adminList: any[] = [];
  public page: number = 1;
  public pageSize: number = 5;
  constructor(
    private _toastr: ToastrService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this._adminService.allAdmins().subscribe({
      next: (res) => {
        this.adminList = res.admins ?? [];
       
      },
    });
  }
  delete(id: string, index: number) {
    this._adminService.deleteAdmin(id).subscribe({
      next: (res) => {
        this._toastr.success("l'administrateur est supprimé");
      },
      error: (err) => {},
      complete: () => {
        let i = this.adminList.findIndex((obj) => obj._id == id);
        this.adminList.splice(i, 1);
      },
    });
  }
}


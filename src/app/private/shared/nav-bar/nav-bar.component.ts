import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '@private/admin/services/admin.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private _document: Document, private _router:Router,private _adminService: AdminService) {}
  role = "";
  fullName="";

  ngOnInit(): void {
    let id = this._adminService.getId();
    this._adminService.getOneAdmin(id).subscribe({
      next:(res)=>{
        this.fullName= res.admin.firstName + ' ' + res.admin.lastName
      }
    })
  }
  toggleSideBar() {
    this._document.getElementById('db-wrapper')?.classList.toggle('toggled');
  }
  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/admin/login'])
  }
}

import { Component, OnInit } from '@angular/core';
import { countries } from '@private/admin/shared/countries';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss']
})
export class AdminUpdateComponent implements OnInit {


  updateAdminForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminService: AdminService,
    private _route: ActivatedRoute
  ) {
    let formControls = {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', ),
      repassword: new FormControl('',),
    };
    this.updateAdminForm = this._fb.group(formControls);
  }

  get firstName() {
    return this.updateAdminForm.get('firstName');
  }
  get lastName() {
    return this.updateAdminForm.get('lastName');
  }
  get email() {
    return this.updateAdminForm.get('email');
  }
  
  get address() {
    return this.updateAdminForm.get('address');
  }
  get phone() {
    return this.updateAdminForm.get('phone');
  }
  get password() {
    return this.updateAdminForm.get('password');
  }
  get repassword() {
    return this.updateAdminForm.get('repassword');
  }

 
  ngOnInit(): void {
    let id = this._route.snapshot.params['id'];

    this._adminService.getOneAdmin(id).subscribe({
      next: (res) => {
        console.log(res);
        this.updateAdminForm.patchValue({
          email: res.admin.email,
          firstName: res.admin.firstName,
          lastName: res.admin.lastName,
          address: res.admin.address,
          phone: res.admin.phone,
        });
      },
      error: (error) => {
        this._toastr.error(error.error.message);
        this._router.navigate(['/admins']);
      },
    });
  }
  updateAdmin() {
    let data = this.updateAdminForm.value;
    let id = this._route.snapshot.params['id'];
    let admin = new Admin(data.email, data.password, data.firstName, data.lastName,"SECONDARY",data.address, data.phone);

    this._adminService.updateAdmin(id, admin).subscribe({
      next: (_result) => {
        this._toastr.success("L'administrateur a été ajouté avec succès");
        this._router.navigate(['/admins']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

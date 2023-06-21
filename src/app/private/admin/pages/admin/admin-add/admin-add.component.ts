import { Component, OnInit } from '@angular/core';
import { countries } from '@private/admin/shared/countries';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  public countries:any = countries
  addAdminForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminService: AdminService
  ) {
    let formControls = {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,]),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('',[Validators.required]),
    };
    this.addAdminForm = this._fb.group(formControls);
  }

  get firstName() {
    return this.addAdminForm.get('firstName');
  }
  get lastName() {
    return this.addAdminForm.get('lastName');
  }
  get email() {
    return this.addAdminForm.get('email');
  }
  get country() {
    return this.addAdminForm.get('country');
  }
  get password() {
    return this.addAdminForm.get('password');
  }
  get repassword() {
    return this.addAdminForm.get('repassword');
  }
  changeCountry(e: any) {
    this.country?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  ngOnInit(): void {}
  addAdmin() {
    let data = this.addAdminForm.value;

    let admin = new Admin(data.email, data.password, data.firstName, data.lastName, "SECONDARY",data.country);

    this._adminService.addAdmin(admin).subscribe({
      next: (_result) => {
        this._toastr.success("Le producteur a été ajouté avec succès");
        this._router.navigate(['/admins']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

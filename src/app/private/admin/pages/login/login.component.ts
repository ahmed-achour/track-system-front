import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../models/admin';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminService: AdminService
  ) { 
    let formLoginControls = {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    };
    this.loginForm = this._fb.group(formLoginControls);
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this._adminService.saveToken()
  }
  
  login() {
    let data = this.loginForm.value;
    let admin = new Admin(data.email, data.password);
    this._adminService.login(admin).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.headers.get('x-token')!);
        this._router.navigate(['/admin/users']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }

}

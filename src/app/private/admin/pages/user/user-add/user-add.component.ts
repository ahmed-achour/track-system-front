import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  addUserForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _userService: UserService
  ) {
    let formControls = {
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^((?!(0))[0-9]*)$'),]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('',[Validators.required]),
      address: new FormControl('', [Validators.required]),

    };
    this.addUserForm = this._fb.group(formControls);
  }

  get fullName() {
    return this.addUserForm.get('fullName');
  }
  get phone() {
    return this.addUserForm.get('phone');
  }
  get password() {
    return this.addUserForm.get('password');
  }
  get repassword() {
    return this.addUserForm.get('repassword');
  }
  get address() {
    return this.addUserForm.get('address');
  }

  ngOnInit(): void {}
  addUser() {
    let data = this.addUserForm.value;

    let user = new User(data.phone, data.password, data.fullName, data.address, "available");

    this._userService.addUser(user).subscribe({
      next: (_result) => {
        this._toastr.success("L'utilisateur a été ajouté avec succès");
        this._router.navigate(['/users']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

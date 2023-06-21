import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  updateUserForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    let formControls = {
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^((?!(0))[0-9]*)$')],),
      password: new FormControl(''),
      repassword: new FormControl(''),
    };
    this.updateUserForm = this._fb.group(formControls);
  }

  get fullName() {
    return this.updateUserForm.get('fullName');
  }
  get phone() {
    return this.updateUserForm.get('phone');
  }
  get password() {
    return this.updateUserForm.get('password');
  }

  get repassword() {
    return this.updateUserForm.get('repassword');
  }

  ngOnInit(): void {
    let id = this._route.snapshot.params['id'];

    this._userService.getOneUser(id).subscribe({
      next: (res) => {
        this.updateUserForm.patchValue({
          phone: res.user.phone,
          fullName: res.user.fullName,
        });
      },
      error: (error) => {
        this._toastr.error(error.error.message);
        this._router.navigate(['/club/events/list']);
      },
    });
  }
  updateUser() {
    let id = this._route.snapshot.params['id'];
    let data = this.updateUserForm.value;

    let user = new User(data.phone, data.password, data.fullName);

    this._userService.updateUser(id, user).subscribe({
      next: (_result) => {
        this._toastr.success("Le producteur a été modifié avec succès");
        this._router.navigate(['/users']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

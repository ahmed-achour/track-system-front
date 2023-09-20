import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Driver } from '../../../models/driver';
import { DriverService } from '../../../services/driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent {
  addDriverForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _driverService: DriverService
  ) {
    let formControls = {
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((?!(0))[0-9]*)$'),
      ]),
      department: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      cid: new FormControl('', [Validators.required]),
      pid: new FormControl('', [Validators.required]),
    };
    this.addDriverForm = this._fb.group(formControls);
  }

  get fullName() {
    return this.addDriverForm.get('fullName');
  }

  get department() {
    return this.addDriverForm.get('department');
  }
  get email() {
    return this.addDriverForm.get('email');
  }
  get cid() {
    return this.addDriverForm.get('cid');
  }
  get pid() {
    return this.addDriverForm.get('pid');
  }
  get phone() {
    return this.addDriverForm.get('phone');
  }

  ngOnInit(): void {}
  addDriver() {
    let data = this.addDriverForm.value;

    let driver = new Driver(
      data.fullName,
      data.phone,
      'available',
      data.department,
      data.email,
      data.cid,
      data.pid
    );

    this._driverService.addDriver(driver).subscribe({
      next: (_result) => {
        this._toastr.success('Le chauffeur a été ajouté avec succès');
        this._router.navigate(['/drivers']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

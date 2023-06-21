import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Driver } from '@private/admin/models/driver';
import { DriverService } from '@private/admin/services/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.scss']
})
export class UpdateDriverComponent {
  updateDriverForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _driverService: DriverService,
    private _route: ActivatedRoute
  ) {
    let formControls = {
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^((?!(0))[0-9]*)$')],),
     
    };
    this.updateDriverForm = this._fb.group(formControls);
  }

  get fullName() {
    return this.updateDriverForm.get('fullName');
  }
  get phone() {
    return this.updateDriverForm.get('phone');
  }


  ngOnInit(): void {
    let id = this._route.snapshot.params['id'];

    this._driverService.getOneDriver(id).subscribe({
      next: (res) => {
        this.updateDriverForm.patchValue({
          phone: res.driver.phone,
          fullName: res.driver.fullName,
        });
      },
      error: (error) => {
        this._toastr.error(error.error.message);
        this._router.navigate(['/drivers']);
      },
    });
  }
  updateDriver() {
    let id = this._route.snapshot.params['id'];
    let data = this.updateDriverForm.value;

    let driver = new Driver( data.fullName , data.phone );

    this._driverService.updateDriver(id, driver).subscribe({
      next: (_result) => {
        this._toastr.success("Le chauffeur a été modifié avec succès");
        this._router.navigate(['/drivers']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '@private/admin/services/driver.service';
import { TruckService } from '@private/admin/services/truck.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-truck',
  templateUrl: './update-truck.component.html',
  styleUrls: ['./update-truck.component.scss']
})
export class UpdateTruckComponent {
  updateTruckForm: FormGroup;
    driverList: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _truckService: TruckService,
    private _driverService: DriverService,

    private _route: ActivatedRoute
  ) {
    let formControls = {
      type: new FormControl('', [Validators.required]),
      serie: new FormControl('', [Validators.required]),
      driver: new FormControl('',[Validators.required]),
    };
    this.updateTruckForm = this._fb.group(formControls);
  }

  get type() {
    return this.updateTruckForm.get('type');
  }
  get serie() {
    return this.updateTruckForm.get('serie');
  }
  get driver() {
    return this.updateTruckForm.get('driver');
  } 

  changeDriver(e: any) {
    this.driver?.setValue(e.target.value, {
      onlySelf: true,
    });
  }


  ngOnInit(): void {
    let id = this._route.snapshot.params['id'];
 this._driverService.allDriver().subscribe({
      next: (res) => {
        this.driverList = res.driver ?? [];
      },
    });
    this._truckService.getOneTruck(id).subscribe({
      next: (res) => {
        this.updateTruckForm.patchValue({
          serie: res.truck.serie,
          type: res.truck.type,
          driver: res.truck.driver,
        });
      },
      error: (error) => {
        this._toastr.error(error.error.message);
        this._router.navigate(['/trucks']);
      },
    });
  }
  updateTruck() {
    let id = this._route.snapshot.params['id'];
    let data = this.updateTruckForm.value;

    let truck = {serie: data.serie, driver: data.driver, type:data.type};

    this._truckService.updateTruck(id, truck).subscribe({
      next: (_result) => {
        this._toastr.success("Le producteur a été modifié avec succès");
        this._router.navigate(['/trucks']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

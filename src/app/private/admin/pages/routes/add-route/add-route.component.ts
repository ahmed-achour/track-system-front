import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '@private/admin/services/driver.service';
import { RouteService } from '@private/admin/services/route.service';
import { TruckService } from '@private/admin/services/truck.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss'],
})
export class AddRouteComponent implements OnInit {
  addRouteForm: FormGroup;
  driverList: any[] = [];
  truckList: any[] = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _truckService: TruckService,
    private _driverService: DriverService,
    private _routeService: RouteService,
  ) {
    let formControls = {
      serie: new FormControl('', [Validators.required]),
      driver: new FormControl('', [Validators.required]),
      startingHour: new FormControl('', [Validators.required]),
    };
    this.addRouteForm = this._fb.group(formControls);
  }

  get serie() {
    return this.addRouteForm.get('serie');
  }
  get driver() {
    return this.addRouteForm.get('driver');
  }
  get startingHour() {
    return this.addRouteForm.get('startingHour');
  }


  changeDriver(e: any) {
    this.driver?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeSerie(e: any) {
    this.serie?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  ngOnInit(): void {
    this._driverService.allDriver().subscribe({
      next: (res) => {
        this.driverList = res.driver.filter((item:any)=>item.state=="available") ?? [];
      },
    });
    this._truckService.allTruck().subscribe({
      next: (res) => {
        this.truckList = res.truck.filter((item:any)=>item.state=="available") ?? [];
      },
    });
  }
  addRoute() {
    let data = this.addRouteForm.value;

    let route = {
      serie: data.serie,
      driver: data.driver,
      startingHour: data.startingHour,
      state: 'available',

    };

    this._routeService.addRoute(route).subscribe({
      next: (_result) => {
        this._toastr.success('Le programme a été ajoutée avec succès');
        this._router.navigate(['/carte']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}

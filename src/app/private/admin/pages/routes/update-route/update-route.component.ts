import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '@private/admin/services/driver.service';
import { RouteService } from '@private/admin/services/route.service';
import { TruckService } from '@private/admin/services/truck.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrls: ['./update-route.component.scss'],
})
export class UpdateRouteComponent implements OnInit {
  updateRouteForm: FormGroup;
  driverList: any[] = [];
  truckList: any[] = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _truckService: TruckService,
    private _driverService: DriverService,
    private _routeService: RouteService
  ) {
    let formControls = {
      serie: new FormControl('', [Validators.required]),
      driver: new FormControl('', [Validators.required]),
      startingHour: new FormControl('', [Validators.required]),
    };
    this.updateRouteForm = this._fb.group(formControls);
  }

  get serie() {
    return this.updateRouteForm.get('serie');
  }
  get driver() {
    return this.updateRouteForm.get('driver');
  }
  get startingHour() {
    return this.updateRouteForm.get('startingHour');
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
    let id = this._route.snapshot.params['id'];
    this._driverService.allDriver().subscribe({
      next: (res) => {
        this.driverList = res.driver ?? [];
      },
    });
    this._truckService.allTruck().subscribe({
      next: (res) => {
        this.truckList = res.truck ?? [];
      },
    });

    this._routeService.getOneRoute(id).subscribe({
      next: (res) => {
        this.updateRouteForm.patchValue({
          serie: res.route.truck,
          startingHour: res.route.hour,
          driver: res.route.driver,
        });
      },
      error: (error) => {
        this._toastr.error(error.error.message);
        this._router.navigate(['/trucks']);
      },
    });
  }
  updateRoute() {
    let data = this.updateRouteForm.value;
    let id = this._route.snapshot.params['id'];
    let route = {
      truck: data.serie,
      driver: data.driver,
      hour: data.startingHour,
    };

    this._routeService.updateRoute(id, route).subscribe({
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

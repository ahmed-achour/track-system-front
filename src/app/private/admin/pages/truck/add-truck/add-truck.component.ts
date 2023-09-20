import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '@private/admin/services/driver.service';
import { TruckService } from '@private/admin/services/truck.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss']
})
export class AddTruckComponent implements OnInit {
  addTruckForm: FormGroup;
  driverList: any[] = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _truckService: TruckService,
    private _driverService: DriverService
  ) {
    let formControls = {
      type: new FormControl('', [Validators.required]),
      serie: new FormControl('', [Validators.required]),
      driver: new FormControl('',[Validators.required]),
      model: new FormControl('',[Validators.required]),
      year: new FormControl('',[Validators.required]),
      energyType: new FormControl('',[Validators.required]),


    };
    this.addTruckForm = this._fb.group(formControls);
  }

  get type() {
    return this.addTruckForm.get('type');
  }
  get serie() {
    return this.addTruckForm.get('serie');
  }
  get driver() {
    return this.addTruckForm.get('driver');
  }
  get model() {
    return this.addTruckForm.get('model');
  }
  get year() {
    return this.addTruckForm.get('year');
  }
  get energyType() {
    return this.addTruckForm.get('energyType');
  }
  
  
  changeDriver(e: any) {
    this.driver?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeEnergyType(e: any) {
    this.energyType?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  ngOnInit(): void {

    this._driverService.allDriver().subscribe({
      next: (res) => {
        this.driverList = res.driver ?? [];
      },
    });
  }
  addTruck() {
    let data = this.addTruckForm.value;

    let truck = {
      serie : data.serie, 
      type: data.type,
      driver: data.driver,
      state: "available",
      model: data.model,
      year: data.year,
      energyType: data.energyType};

    this._truckService.addTruck(truck).subscribe({
      next: (_result) => {
        this._toastr.success("La véhicule a été ajoutée avec succès");
        this._router.navigate(['/trucks']);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }
}


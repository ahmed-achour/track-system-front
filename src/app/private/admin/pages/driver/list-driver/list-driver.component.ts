import { Component, OnInit } from '@angular/core';
import { DriverService } from '@private/admin/services/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.scss'],
})
export class ListDriverComponent implements OnInit {
  driverList: any[] = [];
  public page: number = 1;
  public pageSize: number = 5;
  constructor(
    private _toastr: ToastrService,
    private _driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.getDriverList()
  }

  getDriverList() {
    this._driverService.allDriver().subscribe({
      next: (res) => {
        console.log(res.driver)
        this.driverList = res.driver ?? [];
      },
    });
  }

  updateDriverStatus(id: string) {
    let data = this.driverList.find((driver: any) => driver._id === id);
    let state = {};
    if (data.state == 'available') state = { state: 'unavailable' };
    else state = { state: 'available' };
    this._driverService.updateDriverStatus(id, state).subscribe({
      next: (res) => {
        this.getDriverList();
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }

  delete(id: string, index: number) {
    this._driverService.deleteDriver(id).subscribe({
      next: (res) => {
        this._toastr.success('Le chauffeur est supprimé');
      },
      error: (err) => {},
      complete: () => {
        let i = this.driverList.findIndex((obj) => obj._id == id);
        this.driverList.splice(i, 1);
      },
    });
  }
}

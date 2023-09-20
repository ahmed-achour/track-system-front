import { Component } from '@angular/core';
import { TruckService } from '@private/admin/services/truck.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.scss'],
})
export class ListTruckComponent {
  truckList: any[] = [];
  public page: number = 1;
  public pageSize: number = 5;
  constructor(
    private _toastr: ToastrService,
    private _truckService: TruckService
  ) {}

  ngOnInit(): void {
    this.getTruckList()
  }
  getTruckList() {
    this._truckService.allTruck().subscribe({
      next: (res) => {
        this.truckList = res.truck ?? [];
      },
    });
  }
  updateTruckStatus(id: string) {
    let data = this.truckList.find((truck: any) => truck._id === id);
    let state = {};
    if (data.state == 'available') state = { state: 'unavailable' };
    else state = { state: 'available' };
    this._truckService.updateTruck(id, state).subscribe({
      next: (res) => {
        this.getTruckList();
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
  }

  delete(id: string, index: number) {
    this._truckService.deleteTruck(id).subscribe({
      next: (res) => {
        this._toastr.success("La véhicule est supprimée");
      },
      error: (err) => {},
      complete: () => {
        let i = this.truckList.findIndex((obj) => obj._id == id);
        this.truckList.splice(i, 1);
      },
    });
  }
}

import { Component } from '@angular/core';
import { DriverService } from '@private/admin/services/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.scss']
})
export class ListDriverComponent {
  driverList: any[] = [];
  public page: number = 1;
  public pageSize: number = 5;
  constructor(
    private _toastr: ToastrService,
    private _driverService: DriverService
  ) {}

  ngOnInit(): void {
    this._driverService.allDriver().subscribe({
      next: (res) => {
        this.driverList = res.driver ?? [];
      },
    });
  }
  delete(id: string, index: number) {

    this._driverService.deleteDriver(id).subscribe({
      next: (res) => {
        this._toastr.success("Le producteur est supprimé");
      },
      error: (err) => {},
      complete: () => {
        let i = this.driverList.findIndex((obj) => obj._id == id);
        this.driverList.splice(i, 1);
      },
    });
  }
}

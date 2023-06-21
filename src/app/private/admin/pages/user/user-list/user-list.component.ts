import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: any[] = [];
  public page: number = 1;
  public pageSize: number = 5;
  constructor(
    private _toastr: ToastrService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService.allUsers().subscribe({
      next: (res) => {
        this.userList = res.user ?? [];
      },
    });
  }
  delete(id: string, index: number) {

    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        this._toastr.success("Le producteur est supprimé");
      },
      error: (err) => {},
      complete: () => {
        let i = this.userList.findIndex((obj) => obj._id == id);
        this.userList.splice(i, 1);
      },
    });
  }
}

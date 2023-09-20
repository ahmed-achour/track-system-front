import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '@private/admin/services/admin.service';
import { BaseChartDirective } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public stats: any = {
    nbrUsers: 0,
    nbrDriver: 0,
    nbrTrucks: 0,
    nbrAdmins: 0,
  };
  public page: number = 1;
  public pageSize: number = 5;
  public years: any=[];
  public currentYear: number =new Date().getFullYear()
  public selectedYearUser: string = new Date().getFullYear().toString();
  public selectedYearDriver: string = new Date().getFullYear().toString();

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        ticks: {
          precision: 0,
        },
        min: 0,
      },
    },
  };

  public barChartType: ChartType = 'bar';

  public grapheUsers!: ChartData<'bar'>;
  public grapheDrivers!: ChartData<'bar'>;

  constructor(
    private spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private _adminService: AdminService
  ) {}
  
  ngOnInit() {
    this.spinner.show();
    for (let year = this.currentYear-3; year <= this.currentYear + 3; year++) {
      this.years.push(year);
    }
    this._adminService.allStats(this.selectedYearUser,this.selectedYearDriver).subscribe({
      next: (res) => {
        this.stats = res.stats;
        console.log(this.stats.graphicUser)
        this.grapheUsers = {
          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Avr',
            'Mai',
            'Jui',
            'Juil',
            'Aout',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: this.stats.graphicUser,
              label: 'Utilisateur',
              backgroundColor: 'rgb(31, 81, 255)',
              hoverBackgroundColor: 'rgb(41, 81, 155)',
            },
          ],
        };
        this.grapheDrivers = {
          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Avr',
            'Mai',
            'Jui',
            'Juil',
            'Aout',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: this.stats.graphicDriver,
              label: 'Chauffeur',
              backgroundColor: 'rgba(102, 204, 153)',
              hoverBackgroundColor: 'rgba(102, 204, 103)',
            },
          ],
        };
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      },
      error: (err) => {
        this._toastr.error(err.error.message);
      },
    });
    /** spinner starts on init */
  }
   // events
   public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
  }
}

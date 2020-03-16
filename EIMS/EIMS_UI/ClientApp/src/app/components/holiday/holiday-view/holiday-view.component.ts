import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayViewModel } from 'src/app/models/view-models/holiday-view-model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HolidayService } from 'src/app/services/data/holiday.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { HolidayType } from 'src/app/models/common/constants-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-holiday-view',
  templateUrl: './holiday-view.component.html',
  styleUrls: ['./holiday-view.component.css']
})
export class HolidayViewComponent implements OnInit {
  isLoading: boolean = false;
  holidays: HolidayViewModel[];
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['holidayDate', 'upto', 'holidayType', 'description', 'actions'];
  constructor(
    private holidayService: HolidayService,
    private notificationService: NotificationService,
    private delDialog: MatDialog,
    private datePipe: DatePipe
  ) { }
  getName(v: number): string {
    return HolidayType[v];
  }
  ngOnInit() {
    this.isLoading = true;
    this.holidayService.getViewModel()
      .subscribe(x => {
        this.holidays = x;
        
        this.listData = new MatTableDataSource(this.holidays);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        console.log(this.listData);
        this.isLoading = false;
      })
  }

}

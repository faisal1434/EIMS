import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/data/employee-model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { EmployeeService } from 'src/app/services/data/employee.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { ApiConfig } from 'src/app/configuration/api-config';
import { DesignationService } from 'src/app/services/data/designation.service';
import { throwError } from 'rxjs';
import { Designation } from 'src/app/models/data/designation-model';
import { EmployeeType } from 'src/app/models/common/constants-model';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  ///
  // ***********Fields*****
  //***********************
  imageBaseUrl = ApiConfig.apiBaseUrl;
  designations: Designation[];
  isLoading = false;
  employees: Employee[];
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['picture','employeeName', 'designationId'/*,'employeeType'*/,'phone','email', 'actions'];
  constructor(
    private employeeService: EmployeeService,
    private designationService: DesignationService,
    private notificationService: NotificationService

  ) { }
  getDesignationName(id: number) {
    if (!this.designations) return '';
    let n = '';
    for (let d of this.designations) {
      if (d.designationId == id) {
        n = d.postName;
        break;
      }
    }
    return n;
  }
  getEmployeeTypeName(v: number): string {
    return EmployeeType[v];
  }
  applyFilter(filterValue: string) {
   // console.log(filterValue);
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    //console.log(this.imageBaseUrl);
    this.employeeService.get()
      .subscribe(x => {
        this.employees = x;
        this.listData = new MatTableDataSource < any>(this.employees);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    this.designationService.get()
      .subscribe(x => {
        this.designations = x;
        //console.log(this.designations);
        console.log(this.imageBaseUrl)
      }, err => {
        this.notificationService.success('Cannot load remote data.', 'DISMISS');
        return throwError(err);
      });
  }

}

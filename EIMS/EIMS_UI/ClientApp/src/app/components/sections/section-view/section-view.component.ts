import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionService } from 'src/app/services/data/section.service';
import { AcademicClassService } from 'src/app/services/data/academic-class.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { Section } from 'src/app/models/data/section-model';
import { AcademicClass } from 'src/app/models/data/academic-class-model';
import { throwError } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubjectGroup } from 'src/app/models/common/contants-model';

@Component({
  selector: 'app-section-view',
  templateUrl: './section-view.component.html',
  styleUrls: ['./section-view.component.css']
})
export class SectionViewComponent implements OnInit {
  isLoading = false;
  sections: Section[];
  academicClasses: AcademicClass[];

  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['sectionName', 'subjectGroup', 'academicClassId', 'actions'];
  constructor(
    private sectionService: SectionService,
    private classService: AcademicClassService,
    private notificationService: NotificationService
  ) { }
  getClassName(id: number): string {
    if (!this.academicClasses) return ''
    let a = this.academicClasses.find(a => a.academicClassId == id);
    return a ? a.className : '';
  }
  getSubjectGroupName(v: number): string {
    return SubjectGroup[v];
  }
  applyFilter(filterValue: string) {
    // console.log(filterValue);
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.isLoading = true;
    this.sectionService.get()
      .subscribe(x => {
        this.sections = x;
        this.listData = new MatTableDataSource(this.sections);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }, err => {
        this.notificationService.success("Failed to section list.", "DISMISS");
        this.isLoading = false;
        return throwError(err);
      });
    this.classService.getRunnig()
      .subscribe(x => {
        this.academicClasses = x;
       
        this.isLoading = false;
      }, err => {
        this.notificationService.success("Failed to class list.", "DISMISS");
        this.isLoading = false;
        return throwError(err);
      });

  }
}



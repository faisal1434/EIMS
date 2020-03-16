import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { InstituteInfo } from 'src/app/models/data/institute-info-model';
import { InstituteInfoService } from 'src/app/services/data/institute-info.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Fields
  date: Date;
  instituteInfo: InstituteInfo;
  instituteInfoes: InstituteInfo[];
  constructor(private instituteInfoSvc: InstituteInfoService) {
    console.log(WeekDay.Sunday);
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit() {
    this.date = new Date();
    this.instituteInfoSvc.get()
      .subscribe(x => {
        console.log(x);
        this.instituteInfoes = x;
        if (this.instituteInfoes.length > 0) this.instituteInfo = this.instituteInfoes[0];
        console.log(this.instituteInfo);
      },
        e => {
          
          return throwError(e);
        });
  }
}

import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarEventViewModel } from 'src/app/models/view-models/calendar-event-view-model';
import { HolidayService } from 'src/app/services/data/holiday.service';
import { DatePipe } from '@angular/common';
import { HolidayType } from 'src/app/models/common/constants-model';
import { Holiday } from 'src/app/models/data/holiday-model';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  options: any;
  //events: { title: string, date: string }[] = [];
  holidays: CalendarEventViewModel[];
  
  events:any[] = [
    {
      title: "",
      daysOfWeek: [5, 6], //Sundays and saturdays
      rendering: "background",
      color: "#ff9f89",
      overLap: false,
      allDay: true
    }];
  constructor(
    private holidayService: HolidayService,
    private datePipe: DatePipe
  ) { }
  addEvent(ev) {
    this.events.push(ev);
    console.log(this.events);
  }
  ngOnInit() {
    this.options = {
      editable: true,
      theme: 'standard', // default view, may be bootstrap
      titleFormat: 'MMM D YYYY',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      firstDay: 1,
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      views: {
        agenda: {
          eventLimit: 2
        }
      }
    };
    //this.events.push({ title: 'Event 1', date: '2019-12-11' });
    //this.events.push({ title: 'Event 2', date: '2019-12-17' })
    console.log(this.events);

    this.holidayService.getEvents()
      .subscribe(x => {
        this.holidays = x;
       this.events = [];
        this.holidays.forEach(h => {
          this.events.push({ title: `${h.description}`, date: this.datePipe.transform(h.date, 'yyyy-MM-dd') });
        });
        this.events.push({
          title: "",
          daysOfWeek: [5, 6], //Sundays and saturdays
          rendering: "background",
          color: "#ff9f89",
          overLap: false,
          allDay: true
        });
        console.log(this.events);
      });
       
        
    
  }

}

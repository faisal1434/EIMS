import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomService } from 'src/app/services/data/room.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { RoomType } from 'src/app/models/common/constants-model';
import { Room } from 'src/app/models/data/room-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  room: Room;
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Update',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'save_alt'
    }
  };
  roomForm: FormGroup = new FormGroup({
    roomNo: new FormControl('', Validators.required),
    roomType: new FormControl('', Validators.required),
    capacity: new FormControl('')
  });
  roomTypeOptions: any[] = [];

  constructor(
    private roomService: RoomService,
    private notifationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.roomForm.controls;
  }
  initForm() {
    this.roomForm.setValue({
      roomNo: this.room.roomNo,
      roomType: this.room.roomType,
      capacity: this.room.capacity
    });
  }
  updateData() {

    this.room.roomType = this.f.roomType.value;
    this.room.roomNo = this.f.roomNo.value;
    this.room.capacity = this.f.capacity.value || 0;
    //console.log(data);
    this.roomService.put(this.room)
      .subscribe(x => {
        this.notifationService.success("Data saved successfuly.", "DISMISS");
        this.spinnerButtonOptions.active = false;
        
      });
  }
  onSubmit() {

    if (!this.roomForm.valid) return;
    if (this.f.roomType.value == RoomType.ClassRoom && (this.f.capacity.value == '' || this.f.capacity.value == 0)) {
      this.notifationService.success("Capacity is required for class rooms.", "DISMISS");
      return;
    }
    
    this.spinnerButtonOptions.active = true;
    if (this.f.roomNo.value != this.room.roomNo) {
      
      this.roomService.roomNoCheck(this.f.roomNo.value)
        .subscribe(x => {
          if (x.result) {
            this.notifationService.success(`Room no ${this.f.roomNo.value} already exists`, "DISMISS");
            this.spinnerButtonOptions.active = false;
            return;
          }
          else {
            console.log("Posting");
            this.updateData();
          }
        });
    }
    else {
      this.updateData();
    }

    this.spinnerButtonOptions.active = false;
    //let data = {
    //  roomNo: this.roomForm.value.roomNo,
    //  totalSeat: this.roomForm.value.totalSeat

    //};
    //this.roomService.post(data).
    //  subscribe(x => {
    //    this.notifationService.success("Data inserted.", "DISMISS");
    //    this.roomForm.reset();
    //    this.spinnerButtonOptions.active = false;
    //  })
    //console.log(data)
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    Object.keys(RoomType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.roomTypeOptions.push({ name: v, value: RoomType[v] });
      });
    this.roomService.getById(id)
      .subscribe(x => {
        this.room = x;
        this.initForm();
      });
  }

}

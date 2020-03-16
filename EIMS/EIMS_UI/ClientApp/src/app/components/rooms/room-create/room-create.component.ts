import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RoomService } from 'src/app/services/data/room.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { RoomType } from 'src/app/models/common/constants-model';
import { Room } from 'src/app/models/data/room-model';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {
  
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Insert',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  };
  roomForm: FormGroup = new FormGroup({
    roomNo: new FormControl('', Validators.required),
    roomType: new FormControl('', Validators.required),
    capacity: new FormControl('')
  });
  roomTypeOptions: any[] = [];
  
  constructor(
    private roomService: RoomService,
    private notifationService: NotificationService
  ) { }
  get f() {
    return this.roomForm.controls;
  }

  capacityRequiredValidator(form: FormGroup) {
    console.log(form);
    let c = form.get('roomType').value !== RoomType.ClassRoom;
    if (c) {
      if (form.get('capacity').value == '') {
        return { 'capacityRequiredInvalid': true };
      }
    }
    return null;
  }
  postData() {
    let data = new Room();
    data.roomType = this.f.roomType.value;
    data.roomNo = this.f.roomNo.value;
    data.capacity = this.f.capacity.value || 0;
    //console.log(data);
    this.roomService.post(data)
      .subscribe(x => {
        this.notifationService.success("Data saved successfuly.", "DISMISS");
        this.spinnerButtonOptions.active = false;
        this.roomForm.reset({});
        this.roomForm.setErrors(null);
      });
  }
  onSubmit() {
    
    if (!this.roomForm.valid) return;
    if (this.f.roomType.value == RoomType.ClassRoom && (this.f.capacity.value == '' || this.f.capacity.value == 0)){
      this.notifationService.success("Capacity is required for class rooms.", "DISMISS");
      return;
    }
    this.spinnerButtonOptions.active = true;
    this.roomService.roomNoCheck(this.f.roomNo.value)
      .subscribe(x => {
        if (x.result) {
          this.notifationService.success(`Room no ${this.f.roomNo.value} already exists`, "DISMISS");
          this.spinnerButtonOptions.active = false;
          return;
        }
        else {
          console.log("Posting");
          this.postData();
        }
      });
    
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
    Object.keys(RoomType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v, i) => {
      this.roomTypeOptions.push({ name: v, value: RoomType[v]});
      });
    console.log(this.f);
  }

}

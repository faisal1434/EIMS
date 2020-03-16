import { AbstractControl } from '@angular/forms';
import { RoomService } from 'src/app/services/data/room.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor(private roomService: RoomService) {}
  roomNoValidator(c: AbstractControl) {
    
    if (c.value == '') return null;
    this.roomService.roomNoCheck(c.value)
      .subscribe(x => {
        
        if (x.result) {
          
          return {roomNoInvalid: true }
        }
        else {
          return null;
        }
      });
}

}

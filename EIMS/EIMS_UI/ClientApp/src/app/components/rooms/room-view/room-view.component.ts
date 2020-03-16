import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/services/data/room.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { Room } from 'src/app/models/data/room-model';
import { RoomType } from 'src/app/models/common/constants-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { throwError } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit {
  ///
  // Fields
  ///
  isLoading: boolean = false;
  rooms: Room[];
  
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['roomNo', 'roomType', 'capacity', 'actions'];
  
  constructor(
    private roomService: RoomService,
    private notificationService: NotificationService,
    private deleteDialog: MatDialog
  ) { }
  confirmDelete(item: Room) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.roomService.delete(item)
            .subscribe(x => {
              this.listData.data = this.listData.data.filter(data => data.roomId != item.roomId);
              this.notificationService.success("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }
  getRoomTypeName(v: number): string {
    return RoomType[v];
  }
  

  ngOnInit() {
    this.isLoading = true;
    this.roomService.get()
      .subscribe(x => {
        this.rooms = x;
        this.listData = new MatTableDataSource(this.rooms);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.isLoading = false;
      },
      err => {
        this.notificationService.success("Cannot fetch remote data.", "DISMISS");
        this.isLoading = false;
        return throwError(err);
      });
    
  }

}

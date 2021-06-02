import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../Service/Security/token-storage.service";
import {Message} from "../../Model/Notification/message";

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.css']
})
export class DetailNotificationComponent implements OnInit {

  row: any;
  constructor(public dialogRef: MatDialogRef<DetailNotificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {this.row = data; }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}

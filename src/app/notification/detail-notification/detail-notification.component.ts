import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../Service/Security/token-storage.service";
import {Message} from "../../Model/Notification/message";
import {FormControl, Validators} from "@angular/forms";
import {LivreurService} from "../../Service/livreur.service";
import { Livreur } from 'src/app/Model/livreur';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.css']
})
export class DetailNotificationComponent implements OnInit {

  row: any;
  Livreur = new FormControl();
  listLivreurs: Array<Livreur> = [];

  constructor(public dialogRef: MatDialogRef<DetailNotificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private livreurService: LivreurService)
  {this.row = data; }

  ngOnInit(): void {
    this.getAllLivreursActive();
  }


  getAllLivreursActive() {

    this.livreurService.getAllLivreurs().subscribe(
      data => {

        data.forEach(x => {
          if (x.active === 1) {
            this.listLivreurs.push(x);
          }
        });
      },
      error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close();
  }

  SendNotification() {

  }
}

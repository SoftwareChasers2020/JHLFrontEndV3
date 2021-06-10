import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../Service/Security/token-storage.service";
import {Message} from "../../Model/Notification/message";
import {FormControl, Validators} from "@angular/forms";
import {LivreurService} from "../../Service/livreur.service";
import {Livreur} from 'src/app/Model/livreur';
import {AngularFirestore} from "@angular/fire/firestore";
import {MessagingFirebaseService} from "../../Service/Notification/messaging-firebase.service";
import firebase from "firebase";
import {NotificationService} from "../../Service/notification.service";

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
              private livreurService: LivreurService,
              private firestore: AngularFirestore,
              private messagingService: MessagingFirebaseService,
              private notificationService: NotificationService) {
    this.row = data;
  }

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
    if (this.Livreur.value !== null) {
      firebase.firestore().collection('utilisateurs')
        .doc(String(this.Livreur.value)).get().then(result => {
        let gestToken = result.get('fcmtoken').value;
        console.log(gestToken);
        this.messagingService.sendPushMessageToLivreur("Pick Up !", this.row.notification.body, this.row.notification.nomcommercial, this.row.notification.listCodeBarre, this.row.notification.nomgov, this.row.notification.nomville, this.row.notification.numtelFour, this.Livreur.value, gestToken);
        this.notificationService.success("Notification est envoyée avec succées");
        this.dialogRef.close();
      })
        .catch(err => console.log(err));

    }
    else
    this.notificationService.success("une erreur est servenue lors de l'envoi de notification");


  }
}

import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../Service/Security/token-storage.service';
import {Router} from '@angular/router';
import {UtilisateurService} from '../Service/utilisateur.service';
import {Utilisateur} from '../Model/utilisateur';
import * as $ from 'jquery';
import {MessagingFirebaseService} from "../Service/Notification/messaging-firebase.service";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import {AngularFireMessaging} from "@angular/fire/messaging";
import {Observable} from "rxjs";
import {Message} from "../Model/Notification/message";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DetailColisAdminComponent} from "../Admin_Panel/Gest_Colis_Admin/detail-colis-admin/detail-colis-admin.component";
import {DetailNotificationComponent} from "../notification/detail-notification/detail-notification.component";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  utilisateur: Utilisateur;
  message;
  listnotification: Observable<any[]>;
  constructor(private router: Router,
              public tokenStorage: TokenStorageService,
              private utilisateurService: UtilisateurService,
              private messagingService: MessagingFirebaseService,
              private firestore: AngularFirestore,
              private dialog: MatDialog) {

  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // tslint:disable-next-line:new-parens
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  ngOnInit(): void {
    if (this.tokenExpired(this.tokenStorage.getToken())) {
      // token expired
      console.log('token expireeeeeeed');
      this.tokenStorage.signOut();
      this.router.navigateByUrl('/login');
    } else {

      this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
      // token valid
      // tslint:disable-next-line:new-parens
   //   console.log((Math.floor((new Date).getTime() / 1000)) + '+++' + JSON.parse(atob(this.tokenStorage.getToken().split('.')[1])).exp);

      this.utilisateurService.getUtilisateurById(this.tokenStorage.getId()).subscribe(
        obj => {
          this.utilisateur = obj as Utilisateur;

        },
        err => console.log(err));
      /*    setTimeout(() => this.activate(), 1000);*/
    }
    if(this.tokenStorage.getRole()==="GestionnaireDepot")
    {
      this.getAllNotification();
    }
  }

  logout() {


    this.tokenStorage.remove();
    this.router.navigateByUrl('/login');
    // Delete FCM Token from Firestore
    // tslint:disable-next-line:max-line-length
    /*    this.firestore.collection('utilisateurs').doc(String(this.tokenStorage.getId())).update({fcmtoken : firebase.firestore.FieldValue.delete()}).then(
          result => console.log(result)
        ).catch(
          error => console.log(error)
        );*/
   /* this.angularFireMessaging.deleteToken("dfva4g-42RyE8w-1YzxfQu:APA91bHni_XzNzA1MXdvlen8wujmTzbcxsMwwWmnz1wGCc1gJa88SvzsXVofhJoUu8a50TBQTdd6K2wuJ7tHE8k7oTnVtDyl9jN9UZwjJ2qZwDmRBWzpq4VX8z1BBCsy_fw3Kv9gGo95").subscribe(
      data => console.log(data),
      error => console.log(error)
    )
   ;*/


  }

  activate() {
    location.reload(true);

  }

  getAllNotification()
  { //itemsInView = items.slice(startIndex, endIndex);
    this.listnotification = this.firestore.collection('Notification').valueChanges();

  }

  getDetailNotif(notif: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = notif;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.height = '70%';
    dialogConfig.panelClass = "marg";

    this.dialog.open(DetailNotificationComponent, dialogConfig);
  }
}

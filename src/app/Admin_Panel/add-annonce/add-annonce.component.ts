import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../Service/Security/token-storage.service";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import {Observable} from "rxjs";
import {NotificationService} from "../../Service/notification.service";

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {

  constructor(public tokenStorage: TokenStorageService,
              private firestore: AngularFirestore,
              private notificationService: NotificationService) {
  }

  x:string;

  ngOnInit(): void {
    this.getFromFirebase();
  }


  getFromFirebase() {
    firebase.firestore().collection('annonce')
      .doc("VvU1yRDyucE1jhXiv8lG").onSnapshot(val => {


      this.x = (val.data().texteannonce) ;
      document.getElementById('annonce').innerHTML = this.x;
    //  console.log(this.x)
    });
   /*  firebase.firestore().collection('annonce')
       .doc("VvU1yRDyucE1jhXiv8lG").get().then(res => {
     alert(res.data().texteannonce)
      // this.x = res.get('texteannonce');
     this.x = res.data().texteannonce)*/


  /* const annoceDocument = firebase.firestore().collection('annonce')
     .doc("VvU1yRDyucE1jhXiv8lG");
   const doc = await annoceDocument.get();

   if (doc.exists) {
     this.x =doc.data().texteannonce;

   } else {
     console.log("No such document!");
   }

   return "";*/
}


addannonce()
{
  this.firestore.collection('annonce').doc('VvU1yRDyucE1jhXiv8lG').update({texteannonce: this.x}).then(
    result => this.notificationService.success("L'ajout de l'annonce est effectué avec succées")
  ).catch(
    error => this.notificationService.warn("Une erreur est servenue lors de l'ajout d'une annonce ")
  );
}
}

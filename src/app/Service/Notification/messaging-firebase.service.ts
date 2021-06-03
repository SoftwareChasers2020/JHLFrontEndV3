import {Injectable} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {BehaviorSubject} from 'rxjs';
import {AngularFirestore} from "@angular/fire/firestore";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../Security/token-storage.service";

@Injectable()
export class MessagingFirebaseService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging,
              private firestore: AngularFirestore,
              private http: HttpClient,
              private tokenStorage: TokenStorageService
              ) {

    this.angularFireMessaging.messages.subscribe(
      // tslint:disable-next-line:variable-name
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);

      }
    );
  }

  requestPermission(id: number)  {

    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);

            this.firestore.collection('utilisateurs').doc(String(id)).update({fcmtoken: token}).then(
            result => console.log("successfully updated Utilisateur " + id)
          ).catch(
            error => console.log(error)
          );

          if(this.tokenStorage.getRole() === "GestionnaireDepot")
          {
            this.SaveGestToTopic(token);
            console.log("Save Gestionnaire to Topic successfully")
          }

      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }

    );

  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      });
  }


  sendPushMessageToGestionnaire(title,message,nomcommercial,listCodeBarre: number[],nomgov,nomville,numtelFour) {


    const data = {

      "notification": {
        "title": title,
        "nomcommercial" : nomcommercial,
        "body": message,
        "listCodeBarre": listCodeBarre,
        "nomgov": nomgov,
        "nomville": nomville,
        "numtelFour": numtelFour

    /*    "click_action": "http://localhost:4200/temp",*/

/*        "sound": "default"*/
      },
      "priority" : "high",
      "to": "/topics/TopicGestionnaire"
    };

    const postData = JSON.stringify(data);
    this.firestore.collection('Notification').doc().set(data).then(
      result => console.log("Notification à ajouté avec succés")
    ).catch(
      error => console.log(error)
    );    const url = "https://fcm.googleapis.com/fcm/send";
    this.http.post(url, postData, {
      headers: new HttpHeaders()
        // put the server key here

        .set('Content-Type', 'application/json'),
    })
      .subscribe((response: Response) => {
          console.log(response);
        },
        (error: Response) => {
          console.log(error);
          console.log("error" + error);
        });
  }




  SaveGestToTopic(token)
  {
   // const urlGet ="https://iid.googleapis.com/iid/info/"+token+"?details=true";

   const urlPost = "https://iid.googleapis.com/iid/v1/"+token+"/rel/topics/TopicGestionnaire";

    let existGestTokenInTopic;

/*    this.http.get(urlGet,{
      headers: new HttpHeaders()
        // put the server key here

        .set('Content-Type', 'application/json'),
    }).subscribe(
      data => {
        existGestTokenInTopic = data;
      //  console.log(existGestTokenInTopic.rel.topics.TopicGestionnaire);
        console.log(existGestTokenInTopic);


      },
      error => console.log(error)
    )*/


    this.http.post(urlPost ,'',{
      headers: new HttpHeaders()
        // put the server key here

        .set('Content-Type', 'application/json'),
    })
      .subscribe((response: Response) => {
          console.log(response);
        },
        (error: Response) => {
          console.log(error);
          console.log("error" + error);
        });

  }
}

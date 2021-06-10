import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../Service/Security/token-storage.service';
import {AuthService} from '../Service/Security/auth.service';
import {Login} from '../Model/login';
import {Router} from '@angular/router';
import {NotificationService} from '../Service/notification.service';
import {ToastrService} from 'ngx-toastr';
import {UtilisateurService} from '../Service/utilisateur.service';
import {Utilisateur} from '../Model/utilisateur';
import {Administrateur} from '../Model/administrateur';
import * as $ from "jquery";
import {MessagingFirebaseService} from "../Service/Notification/messaging-firebase.service";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/sb-admin-2.css']
})
export class LoginComponent implements OnInit {
  l: Login = new Login();
  utilisateur: Utilisateur;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private utilisateurService: UtilisateurService,
              private router: Router,
              private toastr: ToastrService,
              private messagingService: MessagingFirebaseService,
              private firestore: AngularFirestore) {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  ngOnInit(): void {

  }


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit(): void {

    this.l.login = this.email.value;
    this.l.password = this.password.value;
    this.authService.login(this.l).subscribe(
      res => this.handleResponse(res),
      err => this.toastr.error(
        `Erreur`,
        'Merci de Vérifier votre email ou mot de passe !',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        }
      ));
  }

  handleResponse(data) {
    this.tokenStorage.handle(data);
    this.authService.changeAuthStatus(true);
    this.utilisateurService.getUtilisateurById(this.tokenStorage.getId()).subscribe(
      obj => {
        this.utilisateur = obj as Utilisateur;



        this.messagingService.requestPermission(this.utilisateur.idUtilisateur);

        if (this.tokenStorage.getRole() === 'Administrateur') {
          this.router.navigateByUrl('/temp');
          this.showNotif();

        } else if (this.tokenStorage.getRole() === 'Fournisseur') {
          this.router.navigateByUrl('/temp/accueilFournisseur');
          this.showNotif();


        } else if (this.tokenStorage.getRole() === 'GestionnaireDepot') {
          this.router.navigateByUrl('/temp/accueilGestionnaire');
          this.showNotif();

          /*firebase.firestore().collection('utilisateurs')
            .doc(String(this.tokenStorage.getId())).get().then(result => {
            let gestToken = result.get('fcmtoken') ;
            this.messagingService.SaveGestToTopic(gestToken);
            console.log(this.utilisateur);
          })
            .catch(err => console.log(err));*/
        }

        else {
          // this.router.navigateByUrl('/temp/accueilLivreur');
          this.toastr.error("Vous n'avez pas d'accées a l'application web");
        }


      }
    );
    // tslint:disable-next-line:max-line-length
    setTimeout(() => this.activate(), 500); // hedhii zedthaaa bech sidebar twali tetsaker 5ater kenet feha mochklaa matetsaker ken ki ta3mel actualiser lil page
  }

  showNotif() {

    this.toastr.success(
      `Bienvenue : ${this.utilisateur.prenom} `,
      'Vous êtes connectés !',
      {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      }
    );
  }

  /*activate(){
    window.location.reload(true);

  }*/
  activate() {


    "use strict"; // Start of use strict

    // Toggle the side navigation
    // tslint:disable-next-line:only-arrow-functions
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      }
    });

    // Close any open menu accordions when window is resized below 768px
    // tslint:disable-next-line:only-arrow-functions
    $(window).resize(function() {
      if ($(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      }

      // Toggle the side navigation when window is resized below 480px
      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $('.sidebar .collapse').collapse('hide');
      }
    });


  }

}

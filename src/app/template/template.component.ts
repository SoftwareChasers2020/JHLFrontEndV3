import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../Service/Security/token-storage.service";
import {Router} from "@angular/router";
import {UtilisateurService} from "../Service/utilisateur.service";
import {Utilisateur} from "../Model/utilisateur";
import * as $ from "jquery";
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  utilisateur: Utilisateur;

  constructor(private router: Router,
              public tokenStorage: TokenStorageService,
              private utilisateurService: UtilisateurService) {

  }

  ngOnInit(): void {

    this.utilisateurService.getUtilisateurById(this.tokenStorage.getId()).subscribe(
      obj => this.utilisateur = obj as Utilisateur,
      err => console.log(err));
/*    setTimeout(() => this.activate(), 1000); */ }

  logout() {

    this.tokenStorage.remove();
    this.router.navigateByUrl("/login");

  }
activate(){
  location.reload(true);

}
 /* activate() {


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


    }*/

}

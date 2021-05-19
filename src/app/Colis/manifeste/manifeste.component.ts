import {Component, OnInit} from '@angular/core';
import {ColisService} from '../../Service/GestColisService/colis.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FeuillerouteService} from '../../Service/GestColisService/feuilleroute.service';
import {FeuilleDeRoute} from '../../Model/GestColis/feuille-de-route';
import {LivreurService} from '../../Service/livreur.service';
import {Livreur} from '../../Model/livreur';
import {VilleService} from '../../Service/ville.service';

@Component({
  selector: 'app-manifeste',
  templateUrl: './manifeste.component.html',
  styleUrls: ['./manifeste.component.css']
})
export class ManifesteComponent implements OnInit {

  constructor(private feuillerouteService: FeuillerouteService,
              private livreurService: LivreurService,
              private villeService: VilleService) {
  }

  feuilleroute: FeuilleDeRoute;
  livreur: Livreur;
  ngOnInit(): void {
    this.feuillerouteService.getFeuillerouteById(6).subscribe(
      data => {
        this.feuilleroute = data as FeuilleDeRoute;
        this.feuilleroute.ligneFeuilleRoute.map(value => this.villeService.getvilleById(value.colis.idVille).subscribe(
          value1 => {
            value.colis.nomville = value1.nom;
            value.colis.nomgouvernorat = value1.gouvernorat.nom;
          }
        ));
        this.livreurService.getLivreurById(this.feuilleroute.idLivreur).subscribe(
          res => this.livreur = res as Livreur,
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

   test(divName) {
     // tslint:disable-next-line:prefer-const
    let printContents = document.getElementById(divName).innerHTML;
     // tslint:disable-next-line:prefer-const
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}

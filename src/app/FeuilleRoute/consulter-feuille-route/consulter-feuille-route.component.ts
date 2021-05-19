import { Component, OnInit } from '@angular/core';
import {FeuillerouteService} from '../../Service/GestColisService/feuilleroute.service';
import {LivreurService} from '../../Service/livreur.service';
import {VilleService} from '../../Service/ville.service';
import {FeuilleDeRoute} from '../../Model/GestColis/feuille-de-route';
import {Livreur} from '../../Model/livreur';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxPrinterService} from 'ngx-printer';

@Component({
  selector: 'app-consulter-feuille-route',
  templateUrl: './consulter-feuille-route.component.html',
  styleUrls: ['./consulter-feuille-route.component.css']
})
export class ConsulterFeuilleRouteComponent implements OnInit {

  constructor(private feuillerouteService: FeuillerouteService,
              private livreurService: LivreurService,
              private villeService: VilleService,
              private route: ActivatedRoute,
              private router: Router,
              private printerService: NgxPrinterService,
              ) {
  }

  feuilleroute: FeuilleDeRoute;
  livreur: Livreur;
  ngOnInit(): void {
    this.feuillerouteService.getFeuillerouteById(this.route.snapshot.params.idFeuilleRoute).subscribe(
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
  imprimer(divName)
  {
    // tslint:disable-next-line:prefer-const
    let printContents = document.getElementById(divName).innerHTML;
    // tslint:disable-next-line:prefer-const
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

  }


}

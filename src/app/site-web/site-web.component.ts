import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ColisService} from "../Service/GestColisService/colis.service";

@Component({
  selector: 'app-site-web',
  templateUrl: './site-web.component.html',
  styleUrls: ['./site-web.component.css']
})
export class SiteWebComponent implements OnInit {
  numcolis = new FormControl(null);
  etattitre : string = null;
  constructor(private colisService: ColisService) { }

  ngOnInit(): void {
  }

  findEtatColis() {
    this.colisService.getColisById(this.numcolis.value).subscribe(
      data => {
        this.etattitre = data.etat.titre;

      },
      error => console.log(error)
    )
  }
}

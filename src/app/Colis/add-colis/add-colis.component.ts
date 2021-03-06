import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Ville} from '../../Model/ville';
import {Gouvernorat} from '../../Model/gouvernorat';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {GouvernoratService} from '../../Service/gouvernorat.service';
import {VilleService} from '../../Service/ville.service';
import {Compteur} from '../../Model/GestColis/compteur';
import {ColisService} from '../../Service/GestColisService/colis.service';
import {Colis} from '../../Model/GestColis/colis';
import {TokenStorageService} from '../../Service/Security/token-storage.service';
import {Client} from '../../Model/GestColis/client';

@Component({
  selector: 'app-add-colis',
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css']
})
export class AddColisComponent implements OnInit {
  c: Compteur;
  colis: Colis = new Colis();
  client: Client = new Client();
  ville: Ville;
  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;


  constructor(private fb: FormBuilder,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public colisService: ColisService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.colisService.formGroup.reset();
    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
    this.colisService.formGroup.patchValue(
      {
        select : "non"
      }
    );
  }

  onSubmit() {


    if (this.colisService.formGroup.valid) {
      this.colisService.addColisFromService();
    } else {
      this.colisService.validateAllFormFields(this.colisService.formGroup);
    }
  }

  changevilleByGovNom(val: any) {

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }


}

import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {GouvernoratService} from '../../../Service/gouvernorat.service';
import {VilleService} from '../../../Service/ville.service';
import {ColisService} from '../../../Service/GestColisService/colis.service';
import { Ville } from 'src/app/Model/ville';
import { Gouvernorat } from 'src/app/Model/gouvernorat';

@Component({
  selector: 'app-new-colis-admin',
  templateUrl: './new-colis-admin.component.html',
  styleUrls: ['./new-colis-admin.component.css']
})
export class NewColisAdminComponent implements OnInit {


  listville: Observable<Ville[]>;
  listGouvernorat: Observable<Gouvernorat[]>;




  constructor(private fb: FormBuilder,
              private gouvernoratService: GouvernoratService,
              private villeService: VilleService,
              public colisService: ColisService) { }

  ngOnInit(): void {
    this.colisService.formGroup.reset();
    this.listGouvernorat = this.gouvernoratService.getAllAGouvernorat();
    this.colisService.formGroup.patchValue(
      {
        select : false
      }
    );
  }

  onSubmit() {

    if (this.colisService.formGroup.valid) {
      this.colisService.addColisFromService();
    } else {
   //   console.log("test");
      this.colisService.validateAllFormFields(this.colisService.formGroup);
    }

  }

  changevilleByGovNom(val: any){

    this.listville = this.villeService.getVilleByGouvernoratNom(val);
  }





}

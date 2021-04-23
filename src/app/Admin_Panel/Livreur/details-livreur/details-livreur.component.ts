import {Component, Inject, OnInit} from '@angular/core';
import {GestionnaireDepotService} from '../../../Service/gestionnaireDepot.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-details-livreur',
  templateUrl: './details-livreur.component.html',
  styleUrls: ['./details-livreur.component.css']
})
export class DetailsLivreurComponent implements OnInit {

  row: any;
  constructor(public dialogRef: MatDialogRef<DetailsLivreurComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any)
  {this.row = data; }

  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }

}

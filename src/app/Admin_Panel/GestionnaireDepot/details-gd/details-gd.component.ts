import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GestionnaireDepotService} from '../../../Service/gestionnaireDepot.service';

@Component({
  selector: 'app-details-gd',
  templateUrl: './details-gd.component.html',
  styleUrls: ['./details-gd.component.css']
})
export class DetailsGDComponent implements OnInit {

  row: any;
  constructor( private GDService: GestionnaireDepotService,
               public dialogRef: MatDialogRef<DetailsGDComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any)
  {this.row = data; }

  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }
}

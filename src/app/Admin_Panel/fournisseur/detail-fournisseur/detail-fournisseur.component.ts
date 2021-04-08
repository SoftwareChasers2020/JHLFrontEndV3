import {Component, Inject, OnInit} from '@angular/core';
import {AdministrateurService} from '../../../Service/administrateur.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-fournisseur',
  templateUrl: './detail-fournisseur.component.html',
  styleUrls: ['./detail-fournisseur.component.css']
})
export class DetailFournisseurComponent implements OnInit {

  row: any;
  constructor(public dialogRef: MatDialogRef<DetailFournisseurComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {this.row = data; }

  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }
}

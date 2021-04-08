import {Component, Inject, Input, OnInit} from '@angular/core';
import {AdministrateurService} from '../../../Service/administrateur.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Administrateur} from '../../../Model/administrateur';

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.css']
})
export class DetailAdminComponent implements OnInit {

  row: any;
  constructor( private administrateurService: AdministrateurService,
               public dialogRef: MatDialogRef<DetailAdminComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any)
      {this.row = data; }

  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }
}

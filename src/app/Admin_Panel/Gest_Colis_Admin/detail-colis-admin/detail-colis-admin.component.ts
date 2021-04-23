import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TokenStorageService} from '../../../Service/Security/token-storage.service';

@Component({
  selector: 'app-detail-colis-admin',
  templateUrl: './detail-colis-admin.component.html',
  styleUrls: ['./detail-colis-admin.component.css']
})
export class DetailColisAdminComponent implements OnInit {
  row: any;
  constructor(public dialogRef: MatDialogRef<DetailColisAdminComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public tokenStorage: TokenStorageService)
  {this.row = data; }

  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }


}

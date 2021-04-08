import {Component, OnInit, ViewChild} from '@angular/core';
import {Fournisseur} from '../../../Model/fournisseur';
import {FournisseurService} from '../../../Service/fournisseur.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-liste-demande-inscription',
  templateUrl: './liste-demande-inscription.component.html',
  styleUrls: ['./liste-demande-inscription.component.css']
})
export class ListeDemandeInscriptionComponent implements OnInit {
  displayedColumns: string[] = ['tofProfile', 'nom', 'prenom', 'NomCommercial', 'etat', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: any;
  listFournisseurs: Fournisseur[];
  constructor(private fournisseurService: FournisseurService) { }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.fournisseurService.getFournisseurNoActive().subscribe(
      res => {
        this.listFournisseurs = res as Fournisseur[];
        this.dataSource = new MatTableDataSource(this.listFournisseurs);

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'NomCommercial': return item.nomcommercial;
            default: return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    );
  }


  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {AddFournisseurComponent} from '../add-fournisseur/add-fournisseur.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetailFournisseurComponent} from '../detail-fournisseur/detail-fournisseur.component';
import {EditFournisseurComponent} from '../edit-fournisseur/edit-fournisseur.component';
import {MatTableDataSource} from '@angular/material/table';
import {NotificationService} from '../../../Service/notification.service';
import {FournisseurService} from '../../../Service/fournisseur.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Fournisseur} from '../../../Model/fournisseur';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {

  displayedColumns: string[] = ['Nom Commercial', 'nom', 'prenom', 'tel', 'adresse.ville.gouvernorat.nom', 'adresse.ville.nom', 'actions'];
  dataSource: MatTableDataSource<any>;
  listfournisseur: Fournisseur[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: any;

  constructor(private fournisseurService: FournisseurService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {

  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.fournisseurService.getAllFournisseur().subscribe(
      res => {

        this.listfournisseur = res.filter(x => x.idUtilisateur > 0);
        const listFournisseurAfterFilterIdFour0 =   this.listfournisseur.filter(x => x.idUtilisateur > 0);
        this.dataSource = new MatTableDataSource(listFournisseurAfterFilterIdFour0);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'adresse.ville.gouvernorat.nom': return item.adresse.ville.gouvernorat.nom;
            case 'adresse.ville.nom' : return item.adresse.ville.nom;
            default: return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(this.listfournisseur);
      },
      error => console.log(error)

    );

  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  reloadData() {
    this.fournisseurService.getAllFournisseur().subscribe(
      data => {
        this.listfournisseur = data.filter(x => x.idUtilisateur > 0);
        this.dataSource = new MatTableDataSource(this.listfournisseur);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onDelete(id: any) {
    if (confirm('Confirmez-vous la suppression ?' )) {
      this.fournisseurService.deleteFournisseur(id).subscribe(
        () =>
        {
          this.reloadData();
        }
      );
      this.notificationService.warn(' supprimé avec succées !');
    }
  }



  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";
    dialogConfig.data = row;
    this.dialog.open(EditFournisseurComponent, dialogConfig).afterClosed().subscribe(
      result => {
        this.reloadData();
      }
    );
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = 'marg';
    this.dialog.open(AddFournisseurComponent, dialogConfig).afterClosed().subscribe(
      result => {
        this.reloadData();
      }
    );
  }


  getDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";

    this.dialog.open(DetailFournisseurComponent, dialogConfig);
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Administrateur} from '../../../Model/administrateur';
import {AdministrateurService} from '../../../Service/administrateur.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NotificationService} from '../../../Service/notification.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditAdministrateurComponent} from '../edit-administrateur/edit-administrateur.component';
import {AddAdministrateurComponent} from '../add-administrateur/add-administrateur.component';
import {DetailAdminComponent} from '../detail-admin/detail-admin.component';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  displayedColumns: string[] = ['login', 'nom', 'prenom', 'tel', 'adresse.ville.gouvernorat.nom', 'adresse.ville.nom', 'actions'];
  dataSource: MatTableDataSource<any>;
  listadmin: Administrateur[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: any;

  constructor(private adminservice: AdministrateurService,
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
    this.adminservice.getAllAAdministrateur().subscribe(
      res => {

        this.listadmin = res;
        this.dataSource = new MatTableDataSource(this.listadmin);
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
        console.log(this.listadmin);
      }

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
    this.adminservice.getAllAAdministrateur().subscribe(
      data => {
        this.listadmin = data;
        this.dataSource = new MatTableDataSource(this.listadmin);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";
    dialogConfig.data = row;
    this.dialog.open(EditAdministrateurComponent, dialogConfig);
  }

  onDelete(id: any) {
    if (confirm('Confirmez-vous la suppression ?' )) {
      this.adminservice.deleteAdministrateur(id).subscribe(
        () =>
        {
          this.reloadData();
        }
      );
      this.notificationService.warn(' supprimé avec succées !');
    }
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";
    this.dialog.open(AddAdministrateurComponent, dialogConfig);
  }


  getDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";

    this.dialog.open(DetailAdminComponent, dialogConfig );
  }

}

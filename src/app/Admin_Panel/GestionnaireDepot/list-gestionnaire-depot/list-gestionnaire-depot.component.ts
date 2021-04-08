import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {AddGestionnaireDepotComponent} from '../add-gestionnaire-depot/add-gestionnaire-depot.component';
import {DetailsGDComponent} from '../details-gd/details-gd.component';
import {EditGestionnaireDepotComponent} from '../edit-gestionnaire-depot/edit-gestionnaire-depot.component';
import {GestionnaireDepotService} from '../../../Service/gestionnaireDepot.service';
import {NotificationService} from '../../../Service/notification.service';
import {GestionnaireDepot} from "../../../Model/GestionnaireDepot";

@Component({
  selector: 'app-list-gestionnaire-depot',
  templateUrl: './list-gestionnaire-depot.component.html',
  styleUrls: ['./list-gestionnaire-depot.component.css']
})
export class ListGestionnaireDepotComponent implements OnInit {

  displayedColumns: string[] = ['login', 'nom', 'prenom', 'tel', 'adresse.ville.gouvernorat.nom', 'adresse.ville.nom', 'date_embauche', 'actions'];
  dataSource: MatTableDataSource<any>;
  listGD: GestionnaireDepot[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: any;
  // pipe: DatePipe;
  constructor(private GDservice: GestionnaireDepotService,
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
    // this.pipe = new DatePipe('en');
    this.GDservice.getAllGestionnaireDepots().subscribe(
      res => {

        this.listGD = res;
        this.dataSource = new MatTableDataSource(this.listGD);
        //  const defaultPredicate = this.dataSource.filterPredicate;
        this.dataSource.filterPredicate = (data, filter: string)  => {
          /* const formatted = this.pipe.transform(data.date_embauche, 'MM/dd/yyyy');
           return formatted.indexOf(filter) >= 0 || defaultPredicate(data, filter) ;*/


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
        console.log(this.listGD);
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
    this.GDservice.getAllGestionnaireDepots().subscribe(
      data => {
        this.listGD = data;
        this.dataSource = new MatTableDataSource(this.listGD);
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
    this.dialog.open(EditGestionnaireDepotComponent, dialogConfig);
  }

  onDelete(id: any) {
    if (confirm('Confirmez-vous la suppression ?' )) {
      this.GDservice.deleteGestionnaireDepot(id).subscribe(
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
    this.dialog.open(AddGestionnaireDepotComponent, dialogConfig);
  }


  getDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.panelClass = "marg";
    this.dialog.open(DetailsGDComponent, dialogConfig);
  }
}

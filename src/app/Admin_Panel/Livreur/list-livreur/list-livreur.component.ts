import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NotificationService} from '../../../Service/notification.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Livreur} from '../../../Model/livreur';
import {LivreurService} from '../../../Service/livreur.service';
import {DetailsLivreurComponent} from '../details-livreur/details-livreur.component';
import {AddLivreurComponent} from '../add-livreur/add-livreur.component';
import {EditLivreurComponent} from '../edit-livreur/edit-livreur.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-livreur',
  templateUrl: './list-livreur.component.html',
  styleUrls: ['./list-livreur.component.css']
})
export class ListLivreurComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['login', 'nom', 'prenom', 'tel', 'adresse.ville.gouvernorat.nom', 'adresse.ville.nom', 'num_urgence', 'date_embauche' , 'actions'];
  dataSource: MatTableDataSource<any>;
  listLiv: Livreur[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: any;
  pipe: DatePipe;
  constructor(private Lservice: LivreurService,
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
  //  this.pipe = new DatePipe('en');
    this.Lservice.getAllLivreurs().subscribe(
      res => {

        this.listLiv = res;
        this.dataSource = new MatTableDataSource(this.listLiv);
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
      //  console.log(this.listLiv);
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
    this.Lservice.getAllLivreurs().subscribe(
      data => {
        this.listLiv = data;
        this.dataSource = new MatTableDataSource(this.listLiv);
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
    this.dialog.open(EditLivreurComponent, dialogConfig).afterClosed().subscribe(
      result => {
        this.reloadData();
      }
    );
  }

  onDelete(id: any) {
    if (confirm('Confirmez-vous la suppression ?' )) {
      this.Lservice.deleteLivreur(id).subscribe(
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


    this.dialog.open(AddLivreurComponent, dialogConfig).afterClosed().subscribe(
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
    this.dialog.open(DetailsLivreurComponent, dialogConfig);
  }

}

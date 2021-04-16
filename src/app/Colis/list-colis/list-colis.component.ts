import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Fournisseur} from '../../Model/fournisseur';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ColisService} from '../../Service/colis.service';
import {Colis} from '../../Model/GestColis/colis';
import {map} from 'rxjs/operators';
import {VilleService} from '../../Service/ville.service';
import {Ville} from '../../Model/ville';
import {Observable, Subscription} from 'rxjs';
import {NotificationService} from '../../Service/notification.service';
import {TokenStorageService} from '../../Service/Security/token-storage.service';
import {ManifesteComponent} from '../manifeste/manifeste.component';
import {NgxPrinterService} from 'ngx-printer';
import {FournisseurService} from '../../Service/fournisseur.service';

@Component({
  selector: 'app-list-colis',
  templateUrl: './list-colis.component.html',
  styleUrls: ['./list-colis.component.css']
})
export class ListColisComponent implements OnInit {
  displayedColumns: string[] = ['Code', 'date_ajout', 'Nom', 'Téléphone', 'Adresse', 'Prix', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sort;
  // tslint:disable-next-line:max-line-length
  @ViewChild(MatSort, {static: false}) set content(content: ElementRef) {  // hedhii zedthaa 5ater mba3d ma3malt div hidden fel html sorting ma3adech yemchi
    this.sort = content;
    if (this.sort){
      this.dataSource.sort = this.sort;
    }
  }
  listcolis: Colis[];
  myDate = new Date();
  searchKey: any;
  ville: Ville;
  mdlSampleIsOpen = false;
  fournisseur: Fournisseur;
  colis: Colis[];

  constructor(private colisService: ColisService,
              private villeService: VilleService,
              private fournisseurService: FournisseurService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private printerService: NgxPrinterService) {
  }

  ngOnInit(): void {

    this.getColisManifeste();
    this.fournisseurService.getFournisseurById(this.tokenService.getId())
      .subscribe(
        data => this.fournisseur = data as Fournisseur,
        error => console.log(error)
      );
    this.colisService.findByFournisseurIdAndEtat(this.tokenService.getId()).subscribe(
      res => {

        this.listcolis = res as Colis[];

        this.dataSource = new MatTableDataSource(this.listcolis);
        this.dataSource.data.map(value => this.villeService.getvilleById(value.idVille).subscribe(
          value1 => {
            value.idVille = value1.nom;
          }
        ));
        this.dataSource.filterPredicate = (data, filter: string) => {
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
            case 'Nom':
              return item.client.nom;
            case 'Téléphone' :
              return item.client.tel1;
            case 'Code' :
              return item.codeBarre;
            case 'Prix':
              return item.prix;
            case 'Adresse' :
              return item.idVille;


            default:
              return item[property];
          }
        };


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.listcolis);
      },
      error => console.log(error)
    );

  }

  nestedFilterCheck(search, data, key): any {
    if (typeof data[key] === "object") {
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

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }


  getColisManifeste() {

    return   this.colisService.findByFournisseurIdAndEtat(this.tokenService.getId()).subscribe(
      res => {
            this.colis = res as Colis[];
            this.colis.map(value => this.villeService.getvilleById(value.idVille).subscribe(
              value1 => {
                // @ts-ignore
                value.idVille = value1.gouvernorat.nom;
              }
            ));
      },
      error => console.log(error)
    );

  }

  onDelete(codeBarre: any) {

    this.colisService.deleteColis(codeBarre).subscribe(
      () => {
        this.reloadData();
        this.mdlSampleIsOpen = false;
      }
    );
    this.notificationService.warn(' supprimé avec succées !');
  }


  hideModal() {
    this.mdlSampleIsOpen = false;
  }

  onEdit(row) {
  }

  showModal() {
    this.mdlSampleIsOpen = true;
  }

  reloadData() {
    this.colisService.findByFournisseurIdAndEtat(this.tokenService.getId()).subscribe(
      data => {
        this.listcolis = data as Colis [];
        this.dataSource = new MatTableDataSource(this.listcolis);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }



  print(): void {
    const printButton = document.getElementById("demo");
    printButton.style.visibility = 'visible';
    this.printerService.printOpenWindow = false;
    this.printerService.printDiv('demo');
    this.printerService.printOpenWindow = true;
    printButton.style.visibility = 'hidden';




  }
  printManifeste() {

    const printButton = document.getElementById("demo");
    printButton.style.visibility = 'visible';
    this.printerService.printOpenWindow = false;
    this.printerService.printDiv('demo');
    this.printerService.printOpenWindow = true;
    printButton.style.visibility = 'hidden';

  }

  getSum(): number {
    return  this.colis.reduce((accum, curr) => accum + curr.prix, 0);
  }

}

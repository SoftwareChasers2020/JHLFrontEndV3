import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FeuilleDeRoute} from '../../Model/GestColis/feuille-de-route';
import {FeuillerouteService} from '../../Service/GestColisService/feuilleroute.service';
import {MatTableDataSource} from '@angular/material/table';
import {Colis} from '../../Model/GestColis/colis';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {LivreurService} from '../../Service/livreur.service';
import {VilleService} from '../../Service/ville.service';
import {Livreur} from '../../Model/livreur';
import {NgxPrinterService} from 'ngx-printer';
import {NotificationService} from '../../Service/notification.service';

@Component({
  selector: 'app-list-feuilleroute',
  templateUrl: './list-feuilleroute.component.html',
  styleUrls: ['./list-feuilleroute.component.css']
})
export class ListFeuillerouteComponent implements OnInit {
  displayedColumns: string[] = ['Numero', 'Date', 'Livreur', 'actions'];
  dataSource: MatTableDataSource<any>;
  listefeuilleRoute: Array<FeuilleDeRoute> = [];
  listefeuilleRouteimp: Array<FeuilleDeRoute> = [];
  searchKey: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('feuille')
  private PrintTemplateTpl: TemplateRef<any>;

  constructor(private feuillerouteService: FeuillerouteService,
              private livreurService: LivreurService,
              private villeService: VilleService,
              private printerService: NgxPrinterService,
              private notificationService: NotificationService,
  ) {
  }


  feuilleroute: FeuilleDeRoute = new FeuilleDeRoute();
  livreur: Livreur;

  ngOnInit(): void {
    this.GetAllFeuillesDeRoute();


  }


  GetAllFeuillesDeRoute() {
    this.feuillerouteService.getAllFeuilleroutes().subscribe(
      res => {

        this.listefeuilleRoute = res as FeuilleDeRoute[];

        this.dataSource = new MatTableDataSource(this.listefeuilleRoute);

        this.dataSource.data.map(value => this.livreurService.getLivreurById(value.idLivreur).subscribe(
          data => value.idLivreur = data.nom + ' ' + data.prenom,
          error => console.log(error)
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
            case 'Numero':
              return item.idFeuilleRoute;
            case 'Date' :
              return item.date;
            case 'Livreur' :
              return item.idLivreur;

            default:
              return item[property];
          }
        };


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error => console.log(error)
    );
  }

  nestedFilterCheck(search, data, key): any {
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

  onDelete(row: any) {


    if (confirm('Confirmez-vous la suppression ?')) {
      this.feuillerouteService.deleteFeuilleroute(row).subscribe(
        () => {
          this.reloadData();
        }
      );
      this.notificationService.warn(' supprimé avec succées !');

    }
  }

  imprimer(row) {
    console.log(row);
    this.listefeuilleRouteimp.length = 0;
    this.feuillerouteService.getFeuillerouteById(row).subscribe(
      data => {

        this.feuilleroute = data as FeuilleDeRoute;
        this.listefeuilleRouteimp.push(this.feuilleroute);

        this.feuilleroute.ligneFeuilleRoute.map(value => this.villeService.getvilleById(value.colis.idVille).subscribe(
          value1 => {
            value.colis.nomville = value1.nom;
            value.colis.nomgouvernorat = value1.gouvernorat.nom;
          }
        ));
        this.livreurService.getLivreurById(this.feuilleroute.idLivreur).subscribe(
          res => this.livreur = res as Livreur,
          error => console.log(error)
        );
        this.printerService.printOpenWindow = false;
        this.printerService.printAngular(this.PrintTemplateTpl);
        this.printerService.printOpenWindow = true;

      },
      error => console.log(error)
    );


  }

  private reloadData() {
    this.feuillerouteService.getAllFeuilleroutes().subscribe(
      res => {

        this.listefeuilleRoute = res as FeuilleDeRoute[];
        this.dataSource = new MatTableDataSource(this.listefeuilleRoute);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}

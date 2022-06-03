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
import {ColisService} from '../../Service/GestColisService/colis.service';
import {Etat} from '../../Model/GestColis/etat';
import {FournisseurService} from "../../Service/fournisseur.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-list-feuilleroute',
  templateUrl: './list-feuilleroute.component.html',
  styleUrls: ['./list-feuilleroute.component.css']
})
export class ListFeuillerouteComponent implements OnInit {
  displayedColumns: string[] = ['Numero', 'Date', 'Livreur', 'DateSortie', 'actions'];
  dataSource: MatTableDataSource<any>;
  listefeuilleRoute: Array<FeuilleDeRoute> = [];
  listefeuilleRouteimp: Array<FeuilleDeRoute> = [];
  searchKey: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listcolis: Array<Colis> = [];
  feuilleroute: FeuilleDeRoute = new FeuilleDeRoute();
  livreur: Livreur;
  @ViewChild('feuille')
  private PrintTemplateTpl: TemplateRef<any>;

  constructor(private feuillerouteService: FeuillerouteService,
              private livreurService: LivreurService,
              private villeService: VilleService,
              private printerService: NgxPrinterService,
              private notificationService: NotificationService,
              private colisService: ColisService,
              private fourniseurservice: FournisseurService,
              private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.GetAllFeuillesDeRoute();


  }


  GetAllFeuillesDeRoute() {
    this.feuillerouteService.getAllFeuilleroutes().subscribe(
      res => {

        this.listefeuilleRoute = res as FeuilleDeRoute[];

        this.dataSource = new MatTableDataSource(this.listefeuilleRoute.sort((a,b)=>b.idFeuilleRoute - a.idFeuilleRoute));

        this.dataSource.data.map(value => this.livreurService.getLivreurById(value.idLivreur).subscribe(
          data => {
            value.idLivreur = data.nom + ' ' + data.prenom;
          },
        ), error => console.log(error));

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
            case 'DateSortie' :
              return item.dateSortie;
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

  onDelete(row: FeuilleDeRoute) {
    if (confirm('Confirmez-vous la suppression ?')) {
      row.ligneFeuilleRoute.forEach(x => {
        //  console.log(x.colis.codeBarre);
        x.colis.etat = new Etat(2, 'En Dépot');
        this.listcolis.push(x.colis);

      });

      this.colisService.SaveAllColis(this.listcolis).subscribe(data => console.log(data),
        error => console.log(error));


      this.feuillerouteService.deleteFeuilleroute(row.idFeuilleRoute).subscribe(
        () => {
          this.reloadData();
        }
      );
      this.notificationService.warn(' supprimé avec succées !');

    }
  }


  imprimer(row) {

    // this.spinner.show();

    this.spinner.show();
    this.feuillerouteService.getFeuillerouteById(row).subscribe(
      data => {

        this.feuilleroute = data as FeuilleDeRoute;
        this.listefeuilleRouteimp.push(this.feuilleroute);

        this.feuilleroute.ligneFeuilleRoute.map(value => this.villeService.getvilleById(value.colis.idVille).subscribe(
          value1 => {
            value.colis.nomville = value1.nom;
            value.colis.nomgouvernorat = value1.gouvernorat.nom;
            this.fourniseurservice.getFournisseurById(value.colis.idFournisseur).subscribe(
              data => value.colis.nomfournisseur = data.login
            );

          }
        ));
        this.livreurService.getLivreurById(this.feuilleroute.idLivreur).subscribe(
          res => this.livreur = res as Livreur,
          error => console.log(error)
        );
        var container = document.getElementById("test");
        // this.onImagesLoaded()

        setTimeout(() => {
          this.onImagesLoaded();
          this.spinner.hide()
        }, 2000);
        /*        this.printerService.printOpenWindow = false;
                this.printerService.printAngular(this.PrintTemplateTpl);
                this.printerService.printOpenWindow = true;*/

        /*        const AjoutAnnonce = document.getElementById('feuilleroute');
                AjoutAnnonce.style.visibility = 'visible';
                this.printerService.printOpenWindow = false;
                this.printerService.printDiv('feuilleroute');
                this.printerService.printOpenWindow = true;
                AjoutAnnonce.style.visibility = 'hidden';*/

        // setTimeout(() => this.activate(), 10000);
        // this.listefeuilleRouteimp.length = 0;
      },
      error => console.log(error)
    );

    // console.log(row);
    /*let divsToPrint = document.getElementsByClassName('axx');

    // tslint:disable-next-line:prefer-for-of
    for (let n = 0; n < divsToPrint.length; n++) {
      console.log(divsToPrint[n]["complete"] )
    }*/

    /* this.spinner.hide();
     this.activate();*/


  }

  onImagesLoaded() {

    var images = document.getElementsByTagName("img");
    var loaded = images.length;
    for (var i = 0; i < images.length; i++) {
      if (images[i].complete) {
        loaded--;
      } else {
        images[i].addEventListener("load", function() {
          loaded--;
          if (loaded == 0) {

            const feuilleroute = document.getElementById('feuilleroute');
            feuilleroute.style.visibility = 'visible';
            const printContents = document.getElementById('feuilleroute').innerHTML;
            // tslint:disable-next-line:prefer-const
            let originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;

            window.print();
            window.location.reload();

          }
        });
      }
      if (loaded == 0) {
        this.activate();
      }

    }
  }

  activate() {
    const feuilleroute = document.getElementById('feuilleroute');
    feuilleroute.style.visibility = 'visible';
    const printContents = document.getElementById('feuilleroute').innerHTML;
    // tslint:disable-next-line:prefer-const
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    window.location.reload();


  }

  print() {
    const printContents = document.getElementById('feuilleroute').innerHTML;
    // tslint:disable-next-line:prefer-const
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    const feuilleroute = document.getElementById('feuilleroute');
    feuilleroute.style.visibility = 'hidden';
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

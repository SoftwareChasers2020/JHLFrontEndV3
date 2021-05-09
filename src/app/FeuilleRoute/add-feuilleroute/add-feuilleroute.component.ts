import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LivreurService} from '../../Service/livreur.service';
import {Livreur} from '../../Model/livreur';
import {GouvernoratService} from '../../Service/gouvernorat.service';
import {Observable} from 'rxjs';
import {Gouvernorat} from 'src/app/Model/gouvernorat';
import {Colis} from '../../Model/GestColis/colis';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ColisService} from '../../Service/GestColisService/colis.service';
import {VilleService} from '../../Service/ville.service';
import {TokenStorageService} from '../../Service/Security/token-storage.service';
import {NotificationService} from '../../Service/notification.service';
import {FournisseurService} from '../../Service/fournisseur.service';
import {EtatService} from '../../Service/GestColisService/etat.service';
import {MatDialog} from '@angular/material/dialog';
import {GestionnaireDepot} from '../../Model/GestionnaireDepot';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {LignefeuillerouteService} from '../../Service/GestColisService/lignefeuilleroute.service';
import {FeuillerouteService} from '../../Service/GestColisService/feuilleroute.service';
import {LigneFeuilleRoute} from '../../Model/GestColis/ligne-feuille-route';
import {FeuilleDeRoute} from '../../Model/GestColis/feuille-de-route';

@Component({
  selector: 'app-add-feuilleroute',
  templateUrl: './add-feuilleroute.component.html',
  styleUrls: ['./add-feuilleroute.component.css']
})
export class AddFeuillerouteComponent implements OnInit {
  Livreur = new FormControl();
  Gouvernorat = new FormControl();
  listLivreurs: Array<Livreur> = [];
  listLigneFeuilleRoute: Array<LigneFeuilleRoute> = [];
  listGouvernorat: Gouvernorat[];
  displayedColumns: string[] = ['Code', 'date_ajout', 'Nom', 'Téléphone', 'Adresse', 'Prix', 'Etat', 'Fournisseur', 'select'];
  dataSource: MatTableDataSource<any>;
  listcolis: Array<Colis> = [];
  listcolisAfterFilterGouv: Array<Colis> = [];
  searchKey: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Colis>(true, []);
  colis: Colis = new Colis();
  feuilleroute: FeuilleDeRoute = new FeuilleDeRoute();

  constructor(private colisService: ColisService,
              private villeService: VilleService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private fournisseurService: FournisseurService,
              private etatService: EtatService,
              private dialog: MatDialog,
              private livreurService: LivreurService,
              private gouvernoratService: GouvernoratService,
              private lignefeuillerouteService: LignefeuillerouteService,
              private feuillerouteService: FeuillerouteService) {
  }

  ngOnInit(): void {
    this.getAllLivreursActive();
    this.getAllGouvernorat();
    this.getColisForFeuilleRoute();
    this.feuillerouteService.getFeuillerouteById(3).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  getAllLivreursActive() {

    this.livreurService.getAllLivreurs().subscribe(
      data => {

        data.forEach(x => {
          if (x.active === 1) {
            this.listLivreurs.push(x);
          }
        });
      },
      error => console.log(error)
    );
  }

  getAllGouvernorat() {
    this.gouvernoratService.getAllAGouvernorat().subscribe(
      data => this.listGouvernorat = data,
      error => console.log(error)
    );
  }

  GetColisByGouvernorat(value: any) {
    console.log(value);
    this.listcolisAfterFilterGouv.length = 0;
    if (value !== '') {
      this.listcolis.forEach(x => {
        //   console.log(x.nomgouvernorat);
        if (x.nomgouvernorat === value) {
          this.listcolisAfterFilterGouv.push(x);
          this.dataSource = new MatTableDataSource(this.listcolisAfterFilterGouv);
        } else {
          this.dataSource = new MatTableDataSource(this.listcolisAfterFilterGouv);
        }
      });
    } else {
      this.dataSource = new MatTableDataSource(this.listcolis);
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  getColisForFeuilleRoute() {
    this.colisService.getColisForFeuilleRoute().subscribe(
      res => {

        this.listcolis = res as Colis[];

        this.dataSource = new MatTableDataSource(this.listcolis);

        this.dataSource.data.map(val => {
          this.etatService.getEtatById(val.etat.idEtat)
            .subscribe(
              data => val.etatTitre = data.titre,

              error => console.log(error)
            );

        });

        this.dataSource.data.map(val => {
          this.fournisseurService.getFournisseurById(val.idFournisseur)
            .subscribe(
              data => val.nomfournisseur = data.nomcommercial,

              error => console.log(error)
            );

        });
        this.dataSource.data.map(value => this.villeService.getvilleById(value.idVille).subscribe(
          value1 => {
            value.nomville = value1.nom;
            value.nomgouvernorat = value1.gouvernorat.nom;

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
              return item.nomgouvernorat;
            case 'Fournisseur' :
              return item.idFournisseur;
            case 'Etat' :
              return item.etat.titre;

            default:
              return item[property];
          }
        };


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.listcolis);
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


  AddLigneFeuilledeRoute() {

    this.selection.selected.forEach(x => {

      delete x.nomgouvernorat;
      delete x.nomfournisseur;
      delete x.nomville;
      delete x.etatTitre;

      this.listLigneFeuilleRoute.push(new LigneFeuilleRoute(x));

    });

    this.feuilleroute.ligneFeuilleRoute = this.listLigneFeuilleRoute;
    this.feuilleroute.idLivreur = this.Livreur.value;
    this.feuillerouteService.createFeuilleroute(this.feuilleroute).subscribe(
      res => console.log(res),
      error => console.log(error)
    );
    this.listLigneFeuilleRoute.length = 0;
    this.selection.clear();

    this.getColisForFeuilleRoute();

  }


  /*  selectRow($event: MatCheckboxChange, row) {
    if ($event.checked) {
       // console.log(row);
      }
    }*/

  checkboxChecked() {
    this.selection.selected.forEach(x => console.log(x));

  }

  testLiv() {
    console.log(this.Livreur.value);
  }
}

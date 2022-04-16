import {Component, OnInit, ViewChild} from '@angular/core';
import {ColisService} from "../../Service/GestColisService/colis.service";
import {TokenStorageService} from "../../Service/Security/token-storage.service";
import {Colis} from "../../Model/GestColis/colis";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {VilleService} from "../../Service/ville.service";
import {NotificationService} from "../../Service/notification.service";
import {FournisseurService} from "../../Service/fournisseur.service";
import {EtatService} from "../../Service/GestColisService/etat.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-accueil-fournisseur',
  templateUrl: './accueil-fournisseur.component.html',
  styleUrls: ['./accueil-fournisseur.component.css']
})
export class AccueilFournisseurComponent implements OnInit {


  livre: number = 0 ;
  retour: number = 0;
  enCours: number = 0;
  enAttente: number= 0;
  displayedColumns: string[] = ['Code', 'date_ajout','date_livraison', 'Nom', 'Téléphone', 'Gouvernorat', 'Ville', 'Prix', 'Etat'];
  dataSource: MatTableDataSource<any>;
  listcolis: Colis[];
  searchKey: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private colisService: ColisService,
              private villeService: VilleService,
              private notificationService: NotificationService,
              private fournisseurService: FournisseurService,
              private etatService: EtatService,
              private dialog: MatDialog,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {

    this.colisService.findByFournisseurId(this.tokenStorage.getId()).subscribe(
      res => {

        this.listcolis = res as Colis[];
        this.getStatistique(this.listcolis);
        this.dataSource = new MatTableDataSource(this.listcolis);

        this.dataSource.data.map(val => {
          this.etatService.getEtatById(val.etat.idEtat)
            .subscribe(
              data => val.idEtat = data.titre,

              error => console.log(error)
            );

        });


        this.dataSource.data.map(value => this.villeService.getvilleById(value.idVille).subscribe(
          value1 => {
            value.idVille = value1.nom;
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
            case 'Gouvernorat' :
              return item.nomgouvernorat;
              case 'Ville' :
              return item.nomville;
            case 'Etat' :
              return item.etat.titre;

            default:
              return item[property];
          }
        };


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     //   console.log(this.listcolis);
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












  getStatistique(listcolis: Colis[]) {

        listcolis.forEach(x => {
          if (x.etat.idEtat == 1) {
            this.enAttente += 1;
          }else if(x.etat.idEtat == 2 || x.etat.idEtat == 3 || x.etat.idEtat == 4)
            this.enCours += 1;
          else if(x.etat.idEtat == 5)
            this.livre +=1;
          else if(x.etat.idEtat == 7)
            this.retour += 1;
        });
      }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Colis} from '../../../Model/GestColis/colis';
import {ColisService} from '../../../Service/GestColisService/colis.service';
import {VilleService} from '../../../Service/ville.service';
import {TokenStorageService} from '../../../Service/Security/token-storage.service';
import {NotificationService} from '../../../Service/notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Fournisseur} from '../../../Model/fournisseur';
import {FournisseurService} from '../../../Service/fournisseur.service';
import {EtatService} from '../../../Service/GestColisService/etat.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetailColisAdminComponent} from '../detail-colis-admin/detail-colis-admin.component';
import {Message} from "../../../Model/PaginationColis/Message";
const pageSize:number = 10;
@Component({
  selector: 'app-list-colis-admin',
  templateUrl: './list-colis-admin.component.html',
  styleUrls: ['./list-colis-admin.component.css']
})
export class ListColisAdminComponent implements OnInit {
page =1;
 currentSelectedPage:number = 0;
  totalPages: number = 0;
  listColiss: Array<Colis> = [];
  pageIndexes: Array<number> = [];



  displayedColumns: string[] = ['Code', 'date_ajout', 'Nom', 'Téléphone', 'Gouvernorat', 'Ville', 'Prix', 'Etat', 'Fournisseur', 'actions'];
  dataSource: MatTableDataSource<any>;
  listcolis: Colis[];
  searchKey: any = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private colisService: ColisService,
              private villeService: VilleService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private fournisseurService: FournisseurService,
              private etatService: EtatService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
 //this.getAllColisForAdminAndGestionnaire();
   this.getPage(0)
   // this.getPageBySearchKey(23792121,0);
  }


  getPage(page: number){

    this.colisService.getAllColisByAdminPagination(page, pageSize)
      .subscribe(
        (response ) => {
        //  console.log(response);
          //this.listColiss = response.listColis;
          this.listcolis = response.listColis as Colis[];

          this.dataSource = new MatTableDataSource(this.listcolis);
          this.totalPages = response.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
          this.currentSelectedPage = response.pageNumber;








          this.dataSource.data.map(val => {
            this.etatService.getEtatById(val.etat.idEtat)
              .subscribe(
                data => val.idEtat = data.titre,

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
        //  console.log(this.listcolis);
        },

        (error) => {
          console.log(error);
        });


  }


  getPaginationWithIndex(index: number) {
  if(this.searchKey == null)
    this.getPage(index-1);
  else
    this.getPageBySearchKey(index-1)
  }

  active(index: number) {
    if(this.currentSelectedPage == index ){
      return {
        active: true
      };
    }
  }

  nextClick(){
    if(this.currentSelectedPage < this.totalPages-1){
      if(this.searchKey == null)
      {
        this.getPage(++this.currentSelectedPage);
      }else
      {
        this.getPageBySearchKey(++this.currentSelectedPage)
      }


    }
  }

  previousClick(){
    if(this.currentSelectedPage > 0){
      if(this.searchKey == null)
      {
        this.getPage(--this.currentSelectedPage);
      }else
      {
        this.getPageBySearchKey(--this.currentSelectedPage)
      }
    }
  }
//hedhiii il s7y7yaaa
/* getAllColisForAdminAndGestionnaire()
  {
    this.colisService.getAllColisByEtatIds().subscribe(
      res => {

        this.listcolis = res as Colis[];

        this.dataSource = new MatTableDataSource(this.listcolis);

        this.dataSource.data.map(val => {
          this.etatService.getEtatById(val.etat.idEtat)
            .subscribe(
              data => val.idEtat = data.titre,

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
        console.log(this.listcolis);
      },
      error => console.log(error)
    );
  }*/

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
    this.getPage(0);
    this.applyFilter();
  }

  onDelete(codeBarre: any) {
    if (confirm('Confirmez-vous la suppression ?')) {
      this.colisService.deleteColis(codeBarre).subscribe(
        () => {
          window.location.reload();
        }
      );
      this.notificationService.warn(' supprimé avec succées !');
    }
  }

  getDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.height = '80%';
    dialogConfig.panelClass = "marg";

    this.dialog.open(DetailColisAdminComponent, dialogConfig);
  }

  getPageBySearchKey(page: number){

    this.colisService.getAllColisByAdminPaginationAndSearchkey(this.searchKey,page,pageSize)
      .subscribe(
        (response ) => {
          console.log(response);
          //this.listColiss = response.listColis;
          this.listcolis = response.listColis as Colis[];

          this.dataSource = new MatTableDataSource(this.listcolis);
          this.totalPages = response.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
          this.currentSelectedPage = response.pageNumber;


          this.dataSource.data.map(val => {
            this.etatService.getEtatById(val.etat.idEtat)
              .subscribe(
                data => val.idEtat = data.titre,

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
          //console.log(this.listcolis);
        },

        (error) => {
          console.log(error);
        });


  }

}

import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Fournisseur} from '../../Model/fournisseur';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ColisService} from '../../Service/GestColisService/colis.service';
import {Colis} from '../../Model/GestColis/colis';
import {map} from 'rxjs/operators';
import {VilleService} from '../../Service/ville.service';
import {Ville} from '../../Model/ville';
import {Observable, Subscription} from 'rxjs';
import {NotificationService} from '../../Service/notification.service';
import {TokenStorageService} from '../../Service/Security/token-storage.service';
import {NgxPrinterService} from 'ngx-printer';
import {FournisseurService} from '../../Service/fournisseur.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DetailColisAdminComponent} from '../../Admin_Panel/Gest_Colis_Admin/detail-colis-admin/detail-colis-admin.component';
import {MessagingFirebaseService} from "../../Service/Notification/messaging-firebase.service";
import firebase from "firebase";
import {Utilisateur} from "../../Model/utilisateur";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-list-colis',
  templateUrl: './list-colis.component.html',
  styleUrls: ['./list-colis.component.css']
})
export class ListColisComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  private mdlSampleIsOpen: boolean;

  @ViewChild(MatPaginator, {static: false}) set contentP(contentP: ElementRef) {
    this.paginator = contentP;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // tslint:disable-next-line:max-line-length
  @ViewChild(MatSort, {static: false}) set content(content: ElementRef) {  // hedhii zedthaa 5ater mba3d ma3malt div hidden fel html sorting ma3adech yemchi
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(private colisService: ColisService,
              private villeService: VilleService,
              private fournisseurService: FournisseurService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private printerService: NgxPrinterService,
              private dialog: MatDialog,
              private messagingfirebase: MessagingFirebaseService,
              private spinner: NgxSpinnerService) {
  }

  displayedColumns: string[] = ['Code', 'date_ajout', 'Nom', 'T??l??phone', 'Adresse', 'Prix', 'actions'];
  dataSource: MatTableDataSource<any>;


  paginator;


  sort;
  myDate = new Date();
  listcolis: Colis[];
  searchKey: any;
  fournisseur: Fournisseur;
  colis: Colis[];
  listCodeBarre: number[];
  //utilisateur: Utilisateur;
  @ViewChild('tab')
  private PrintTemplateTpl: TemplateRef<any>;

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
            case 'T??l??phone' :
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
     //   console.log(this.listcolis);
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


  getColisManifeste() {

    return this.colisService.findByFournisseurIdAndEtat(this.tokenService.getId()).subscribe(
      res => {
        this.colis = res as Colis[];
        this.colis.map(value => this.villeService.getvilleById(value.idVille).subscribe(
          value1 => {
            // @ts-ignore
            value.idVille = value1.gouvernorat.nom;
            value.nomville = value1.nom;
          }
        ));
      },
      error => console.log(error)
    );

  }


  onDelete(codeBarre: any) {

  //  console.log(codeBarre);
    if (confirm('Confirmez-vous la suppression ?')) {
      this.colisService.deleteColis(codeBarre).subscribe(
        () => {
          window.location.reload();
        }
      );
      this.notificationService.warn(' supprim?? avec succ??es !');
    //  console.log(codeBarre);
    }
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
    this.spinner.show();
    // tslint:disable-next-line:prefer-const
    let divsToPrint = document.getElementsByClassName('x');
    let printContents = '';
    // tslint:disable-next-line:prefer-for-of
    for (let n = 0; n < divsToPrint.length; n++) {
      printContents += divsToPrint[n].innerHTML + '<br>';
    }
    setTimeout(() => this.allbons(printContents), 2500);
    // tslint:disable-next-line:prefer-const
  //  let originalContents = document.body.innerHTML;

   // document.body.innerHTML = originalContents;

    // tslint:disable-next-line:one-variable-per-declaration prefer-const
    /* let divsToPrint = document.getElementsByClassName('x'), n;
     for (n = 0; n < divsToPrint.length; n++) {
    //   printDiv(divsToPrint[n]);
       console.log(n);
     }*/
    /* const bonLivraison = document.getElementById("BonLivraison");
     bonLivraison.style.visibility = 'visible';
     this.printerService.printOpenWindow = false;
     this.printerService.printDiv('BonLivraison');
     this.printerService.printOpenWindow = true;
     bonLivraison.style.visibility = 'hidden';*/

  }

  allbons (printContents) {
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
  }


  printManifeste() {

    this.spinner.show();
    const manifeste = document.getElementById('Manifeste');
    manifeste.style.visibility = 'visible';

    setTimeout(() => this.manifest(), 2500);

  }
  manifest() {

    const printContents = document.getElementById('Manifeste').innerHTML;


    document.body.innerHTML = printContents;
    this.spinner.hide();
    window.print();
    window.location.reload();
  }

  getSum(): number {
    return this.colis.reduce((accum, curr) => accum + curr.prix, 0);
  }

  hideModal() {
    this.mdlSampleIsOpen = false;
  }

  onEdit(row) {
  }

  showModal(c) {
    this.mdlSampleIsOpen = true;
   // console.log(c);
    /*      const DeleteModal = document.getElementById("DeleteModal");
          DeleteModal.style.visibility = 'visible';*/
  }


  getDetails(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.maxWidth = '100%';
    dialogConfig.minWidth = '40%';
    dialogConfig.height = '80%';
    dialogConfig.panelClass = 'marg';

    this.dialog.open(DetailColisAdminComponent, dialogConfig);
  }

  imprimer(colis) {
    this.spinner.show();
    this.colis.length = 0;

    this.colis.push(colis);
    setTimeout(() => this.bon(), 1500);

  }
  bon(){

  this.printerService.printOpenWindow = false;
  this.printerService.printAngular(this.PrintTemplateTpl);
  this.printerService.printOpenWindow = true;
  this.getColisManifeste();
  this.spinner.hide()
  }
  SendNotification() {
    if(this.listcolis.length != 0) {
      this.listCodeBarre = this.listcolis.map(x => x.codeBarre);
      this.messagingfirebase.sendPushMessageToGestionnaire("Pick Up !", "Nombre de colis :" + this.listCodeBarre.length, this.fournisseur.nomcommercial, this.listCodeBarre, this.fournisseur.adresse.ville.gouvernorat.nom, this.fournisseur.adresse.ville.nom, this.fournisseur.tel);
      this.notificationService.success("Notification est envoy??e avec succ??es");
    }
    else
      this.notificationService.warn("vous remplir au moins un colis pour envoyer une notification de ramassage de colis !")

  }
}

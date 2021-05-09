import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { AddFournisseurComponent } from './Admin_Panel/fournisseur/add-fournisseur/add-fournisseur.component';
import { EditFournisseurComponent } from './Admin_Panel/fournisseur/edit-fournisseur/edit-fournisseur.component';
import { ListFournisseurComponent } from './Admin_Panel/fournisseur/list-fournisseur/list-fournisseur.component';
import { DetailFournisseurComponent } from './Admin_Panel/fournisseur/detail-fournisseur/detail-fournisseur.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {DetailsGDComponent} from './Admin_Panel/GestionnaireDepot/details-gd/details-gd.component';
import {EditGestionnaireDepotComponent} from './Admin_Panel/GestionnaireDepot/edit-gestionnaire-depot/edit-gestionnaire-depot.component';
import {ListGestionnaireDepotComponent} from './Admin_Panel/GestionnaireDepot/list-gestionnaire-depot/list-gestionnaire-depot.component';
import {AddGestionnaireDepotComponent} from './Admin_Panel/GestionnaireDepot/add-gestionnaire-depot/add-gestionnaire-depot.component';
import {ListLivreurComponent} from './Admin_Panel/Livreur/list-livreur/list-livreur.component';
import {EditLivreurComponent} from './Admin_Panel/Livreur/edit-livreur/edit-livreur.component';
import {AddLivreurComponent} from './Admin_Panel/Livreur/add-livreur/add-livreur.component';
import {DetailsLivreurComponent} from './Admin_Panel/Livreur/details-livreur/details-livreur.component';
import { ListeDemandeInscriptionComponent } from './Admin_Panel/fournisseur/liste-demande-inscription/liste-demande-inscription.component';
import { DemandeFournisseurComponent } from './Admin_Panel/fournisseur/demande-fournisseur/demande-fournisseur.component';
import {InscriptionFComponent} from './Admin_Panel/fournisseur/Inscription-Fournisseur/inscription-f.component';
import { TemplateComponent } from './template/template.component';
/*import {AccueilComponent} from './accueil/accueil.component';*/
import {LoginComponent} from './Login/login.component';
import {DashbordComponent} from './Dashbord/dashbord.component';
import { AccueilFournisseurComponent } from './UserPanel/accueil-fournisseur/accueil-fournisseur.component';
import { AccueilGestionnaireComponent } from './UserPanel/accueil-gestionnaire/accueil-gestionnaire.component';
import { AccueilLivreurComponent } from './UserPanel/accueil-livreur/accueil-livreur.component';
import { authInterceptorProviders } from './Service/Security/Helpers/auth-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { EditProfilComponent } from './Admin_Panel/fournisseur/edit-profil/edit-profil.component';
import { AddColisComponent } from './Colis/add-colis/add-colis.component';
import { ListColisComponent } from './Colis/list-colis/list-colis.component';
import {MatRadioModule} from '@angular/material/radio';
import { ManifesteComponent } from './Colis/manifeste/manifeste.component';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';
import { ListColisAdminComponent } from './Admin_Panel/Gest_Colis_Admin/list-colis-admin/list-colis-admin.component';
import { NewColisAdminComponent } from './Admin_Panel/Gest_Colis_Admin/new-colis-admin/new-colis-admin.component';
import { EditColisAdminComponent } from './Admin_Panel/Gest_Colis_Admin/edit-colis-admin/edit-colis-admin.component';
import { DetailColisAdminComponent } from './Admin_Panel/Gest_Colis_Admin/detail-colis-admin/detail-colis-admin.component';
import { EditColisComponent } from './Colis/edit-colis/edit-colis.component';
import { DetailColisComponent } from './Colis/detail-colis/detail-colis.component';
import { AddFeuillerouteComponent } from './FeuilleRoute/add-feuilleroute/add-feuilleroute.component';
import { ListFeuillerouteComponent } from './FeuilleRoute/list-feuilleroute/list-feuilleroute.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConsulterFeuilleRouteComponent } from './FeuilleRoute/consulter-feuille-route/consulter-feuille-route.component';


@NgModule({
  declarations: [
    AppComponent,

    ListGestionnaireDepotComponent,
    EditGestionnaireDepotComponent,
    DetailsGDComponent,
    AddGestionnaireDepotComponent,

    AddFournisseurComponent,
    EditFournisseurComponent,
    ListFournisseurComponent,
    DetailFournisseurComponent,


    ListLivreurComponent,
    EditLivreurComponent,
    AddLivreurComponent,
    DetailsLivreurComponent,
    ListeDemandeInscriptionComponent,
    DemandeFournisseurComponent,
    InscriptionFComponent,

    LoginComponent,
    TemplateComponent,
/*    AccueilComponent,*/
    DashbordComponent,
    AccueilFournisseurComponent,
    AccueilGestionnaireComponent,
    AccueilLivreurComponent,
    EditProfilComponent,
    AddColisComponent,
    ListColisComponent,
    ManifesteComponent,
    ListColisAdminComponent,
    NewColisAdminComponent,
    EditColisAdminComponent,
    DetailColisAdminComponent,
    EditColisComponent,
    DetailColisComponent,
    AddFeuillerouteComponent,
    ListFeuillerouteComponent,
    ConsulterFeuilleRouteComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    NgxPrintModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
    NgxPrinterModule.forRoot({printOpenWindow: true})

  ],

  providers: [authInterceptorProviders ],
  bootstrap: [AppComponent]
})

export class AppModule { }

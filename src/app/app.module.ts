import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAdministrateurComponent } from './Admin_Panel/Administrateur/add-administrateur/add-administrateur.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListAdminComponent } from './Admin_Panel/Administrateur/list-admin/list-admin.component';
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
import { EditAdministrateurComponent } from './Admin_Panel/Administrateur/edit-administrateur/edit-administrateur.component';
import { DetailAdminComponent } from './Admin_Panel/Administrateur/detail-admin/detail-admin.component';
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



@NgModule({
  declarations: [
    AppComponent,


    AddAdministrateurComponent,
    ListAdminComponent,
    EditAdministrateurComponent,
    DetailAdminComponent,

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
    ToastrModule.forRoot()


  ],

  providers: [authInterceptorProviders ],
  bootstrap: [AppComponent]
})

export class AppModule { }

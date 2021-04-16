import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddAdministrateurComponent} from './Admin_Panel/Administrateur/add-administrateur/add-administrateur.component';
import {ListAdminComponent} from './Admin_Panel/Administrateur/list-admin/list-admin.component';
import {ListFournisseurComponent} from './Admin_Panel/fournisseur/list-fournisseur/list-fournisseur.component';
import {DashbordComponent} from './Dashbord/dashbord.component';
import {ListGestionnaireDepotComponent} from './Admin_Panel/GestionnaireDepot/list-gestionnaire-depot/list-gestionnaire-depot.component';
import {ListLivreurComponent} from './Admin_Panel/Livreur/list-livreur/list-livreur.component';
import {ListeDemandeInscriptionComponent} from './Admin_Panel/fournisseur/liste-demande-inscription/liste-demande-inscription.component';
import {DemandeFournisseurComponent} from './Admin_Panel/fournisseur/demande-fournisseur/demande-fournisseur.component';
import {InscriptionFComponent} from './Admin_Panel/fournisseur/Inscription-Fournisseur/inscription-f.component';
import {TemplateComponent} from './template/template.component';
import {LoginComponent} from './Login/login.component';
import {AfterAuthGuard} from './guards/after-auth.guard';
import {AccueilFournisseurComponent} from './UserPanel/accueil-fournisseur/accueil-fournisseur.component';
import {AccueilGestionnaireComponent} from './UserPanel/accueil-gestionnaire/accueil-gestionnaire.component';
import {AccueilLivreurComponent} from './UserPanel/accueil-livreur/accueil-livreur.component';
import {EditProfilComponent} from './Admin_Panel/fournisseur/edit-profil/edit-profil.component';
import {AddColisComponent} from './Colis/add-colis/add-colis.component';
import {AuthGuard} from './guards/auth.guard';
import {ListColisComponent} from './Colis/list-colis/list-colis.component';
import {ManifesteComponent} from './Colis/manifeste/manifeste.component';


const routes: Routes = [
  {path: '', component: ManifesteComponent},
/*      {path: '', component: AccueilComponent},*/
      {path: 'inscriptionF', component: InscriptionFComponent},
       {path: 'login', component: LoginComponent , canActivate: [AfterAuthGuard]},

          {path: 'temp', component: TemplateComponent, children : [

          {path: 'accueilFournisseur', component: AccueilFournisseurComponent},
          {path: 'accueilGestionnaire', component: AccueilGestionnaireComponent},
          {path: 'accueilLivreur', component: AccueilLivreurComponent},
          {path: 'addAdmin', component: AddAdministrateurComponent},
          {path: 'List_admin', component: ListAdminComponent},
          {path: 'List_Fournisseur', component: ListFournisseurComponent},
          {path: 'List_GestDepot', component: ListGestionnaireDepotComponent},
          {path: 'List_Livreur', component: ListLivreurComponent},
          {path: 'DemandeFour/:id', component: DemandeFournisseurComponent},
          {path: 'listDemandeFour', component: ListeDemandeInscriptionComponent},
          {path: 'editProfil/:id', component: EditProfilComponent},
          {path: 'coli', component: AddColisComponent},
              {path: 'ListColis', component: ListColisComponent},
          {path: '', component: DashbordComponent},
    ], canActivate: [AuthGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

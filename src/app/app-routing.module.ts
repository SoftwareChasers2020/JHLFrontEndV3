import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import {EditProfilComponent} from './Admin_Panel/fournisseur/edit-profil/edit-profil.component';
import {AddColisComponent} from './Colis/add-colis/add-colis.component';
import {AuthGuard} from './guards/auth.guard';
import {ListColisComponent} from './Colis/list-colis/list-colis.component';
import {ListColisAdminComponent} from './Admin_Panel/Gest_Colis_Admin/list-colis-admin/list-colis-admin.component';
import {NewColisAdminComponent} from './Admin_Panel/Gest_Colis_Admin/new-colis-admin/new-colis-admin.component';
import {EditColisAdminComponent} from './Admin_Panel/Gest_Colis_Admin/edit-colis-admin/edit-colis-admin.component';
import {EditColisComponent} from './Colis/edit-colis/edit-colis.component';
import {AddFeuillerouteComponent} from './FeuilleRoute/add-feuilleroute/add-feuilleroute.component';
import {ListFeuillerouteComponent} from './FeuilleRoute/list-feuilleroute/list-feuilleroute.component';
import {ConsulterFeuilleRouteComponent} from './FeuilleRoute/consulter-feuille-route/consulter-feuille-route.component';
import {AddAnnonceComponent} from "./Admin_Panel/add-annonce/add-annonce.component";
import {SiteWebComponent} from "./site-web/site-web.component";


const routes: Routes = [
      {path: '', component: SiteWebComponent},
      {path: 'inscriptionF', component: InscriptionFComponent},
       {path: 'login', component: LoginComponent , canActivate: [AfterAuthGuard]},

          {path: 'temp', component: TemplateComponent, children : [
          {path: 'coli', component: AddColisComponent},
          {path: 'accueilFournisseur', component: AccueilFournisseurComponent},
          {path: 'accueilGestionnaire', component: AccueilGestionnaireComponent},
          {path: 'List_Fournisseur', component: ListFournisseurComponent},
          {path: 'List_GestDepot', component: ListGestionnaireDepotComponent},
          {path: 'List_Livreur', component: ListLivreurComponent},
          {path: 'DemandeFour/:id', component: DemandeFournisseurComponent},
          {path: 'listDemandeFour', component: ListeDemandeInscriptionComponent},
          {path: 'editProfil/:id', component: EditProfilComponent},
              {path:'annonce', component: AddAnnonceComponent},
          {path: 'coli', component: AddColisComponent},
          {path: 'ListColis', component: ListColisComponent},
          {path: 'ListColisAdmin', component: ListColisAdminComponent},
          {path: 'newColisAdmin', component: NewColisAdminComponent},
          {path: 'EditColisAdmin/:codeBarre', component: EditColisAdminComponent},
          {path: 'EditColis/:codeBarre', component: EditColisComponent},

          {path: 'FeuilleRoute', component: AddFeuillerouteComponent},
              {path: 'ListFeuilleRoute', component: ListFeuillerouteComponent},
              {path: 'Consulterfeuille/:idFeuilleRoute', component: ConsulterFeuilleRouteComponent},
          {path: '', component: DashbordComponent},
    ], canActivate: [AuthGuard],},




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

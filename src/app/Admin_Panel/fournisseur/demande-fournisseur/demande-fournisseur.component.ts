import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../../Model/fournisseur';
import {ActivatedRoute, Router} from '@angular/router';
import {FournisseurService} from '../../../Service/fournisseur.service';
import {MailService} from '../../../Service/mail.service';
import {NotificationService} from '../../../Service/notification.service';

@Component({
  selector: 'app-demande-fournisseur',
  templateUrl: './demande-fournisseur.component.html',
  styleUrls: ['./demande-fournisseur.component.css']
})
export class DemandeFournisseurComponent implements OnInit {
  id: number;
  f: Fournisseur = new Fournisseur();


  constructor(private fournisseurService: FournisseurService,
              private emailservice: MailService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.fournisseurService.getFournisseurById(this.id).subscribe(
      data => {
        this.f = data as Fournisseur;
      }
      , error => console.log(error));
  }


  AcceptDemande() {
    if (confirm("Confirmez-vous l'acceptation demande ?" )) {
      this.emailservice.accepterDemande(this.f.idUtilisateur).subscribe(
        (data) =>
        {
          this.notificationService.success(' Vous Avez accepter la demande !!');
          this.router.navigate(['/temp/listDemandeFour']);
        }
      ); }
  }

  RefuserDemande() {
    if (confirm("Confirmez-vous votre refuse de la demande ?" )) {
      this.emailservice.refuserDemande(this.f.idUtilisateur).subscribe(
        () =>
        {
          this.notificationService.warn(' Vous Avez refuser la demande ');
          this.router.navigate(['/temp/listDemandeFour']);
        }
      ); }
  }
}




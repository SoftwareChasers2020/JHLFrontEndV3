import {Client} from './client';


import {Etat} from './etat';
import {LigneFeuilleRoute} from './ligne-feuille-route';

export class Colis {
 // idColis: number;
  codeBarre: number;
  designation: string;
  nbArticle: number;
  prix: number;
  echange: boolean;
  nbArticleEchange: number;
  commentaire: string;
  designationEchange: string;
  adressDispo: string;
  idVille: number;
  idFournisseur: number;
  etatTitre?: string;
  nomgouvernorat?: string;
  nomville?: string;
  nomfournisseur?: string;
  // tslint:disable-next-line:variable-name
  date_ramassage: Date;
  // tslint:disable-next-line:variable-name
  date_livraison: Date;
  // tslint:disable-next-line:variable-name
  date_ajout: Date;
  client: Client;
  etat: Etat;
  remarque: string;
  modepaiement: number;
  ligneFeuilleRouteColis: LigneFeuilleRoute[];
}

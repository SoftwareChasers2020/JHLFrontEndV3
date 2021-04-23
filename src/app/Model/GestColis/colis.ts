import {Client} from './client';

import {Manifeste} from './manifeste';
import {Etat} from './etat';
import {LigneFeuilleRoute} from './ligne-feuille-route';

export class Colis {
  idColis: number;
  codeBarre: string;
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
  manifeste: Manifeste;
  ligneFeuilleRouteColis: LigneFeuilleRoute[];
}

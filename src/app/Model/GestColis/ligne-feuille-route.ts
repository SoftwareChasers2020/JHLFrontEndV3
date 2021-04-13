import {FeuilleDeRoute} from './feuille-de-route';
import {Colis} from './colis';

export class LigneFeuilleRoute {
  idLigneFeuilleRoute: number;
  accuseReception: string;
  // tslint:disable-next-line:variable-name
  dateEtHeure_reception: Date;
  remarque: string;
  feuilleRoute: FeuilleDeRoute;
  colis: Colis;
}

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


  constructor(colis?: Colis) {
    this.colis = colis;
  }

  /*  constructor(feuilleRoute: FeuilleDeRoute, colis: Colis) {
    this.feuilleRoute = feuilleRoute;
    this.colis = colis;
  }*/
}

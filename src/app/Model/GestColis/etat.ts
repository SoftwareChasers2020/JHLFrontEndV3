import {Colis} from './colis';

export class Etat {
  idEtat: number;
  titre: string;
  listcolisEtat?: Colis[];


  constructor(idEtat: number, titre: string) {
    this.idEtat = idEtat;
    this.titre = titre;
  }
}

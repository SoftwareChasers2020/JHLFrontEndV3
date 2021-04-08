import {Observable} from 'rxjs';
import {Ville} from './ville';

export class Gouvernorat {
  Id: number;
  nom: string;
  ListVilles: Observable<Ville>;
}

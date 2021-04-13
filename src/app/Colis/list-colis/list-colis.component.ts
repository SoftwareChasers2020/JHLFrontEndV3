import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Fournisseur} from '../../Model/fournisseur';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ColisService} from '../../Service/colis.service';
import {Colis} from '../../Model/GestColis/colis';
import {map} from 'rxjs/operators';
import {VilleService} from '../../Service/ville.service';
import {Ville} from '../../Model/ville';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-list-colis',
  templateUrl: './list-colis.component.html',
  styleUrls: ['./list-colis.component.css']
})
export class ListColisComponent implements OnInit {
  displayedColumns: string[] = ['Code', 'date_ajout', 'Nom', 'Téléphone', 'Adresse', 'Prix', 'actions'];
  dataSource: MatTableDataSource<any>;
  listcolis: Colis[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: any;
  ville: Ville;
  villes: Ville[];

  constructor(private colisService: ColisService,
              private villeService: VilleService) { }

  ngOnInit(): void {



    this.colisService.getAllColis().subscribe(
      res => {

    this.listcolis = res;
    this.dataSource = new MatTableDataSource(this.listcolis);
    this.dataSource.data.map(value => this.villeService.getvilleById(value.idVille).subscribe(
      value1 => {value.idVille = value1.nom;
      }

    ) );
    this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

    this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Nom': return item.client.nom;
            case 'Téléphone' : return item.client.tel1;
            case 'Code' : return item.codeBarre;
            case 'Prix': return item.prix;
            case 'Adresse' : return item.idVille;


            default: return item[property];
          }
        };



    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.listcolis);
      },
      error => console.log(error)
    );
  }

  nestedFilterCheck(search, data, key): any {
    if (typeof data[key] === "object") {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }


  getvillebyId(id){

  return  this.villeService.getvilleById(id);



  }
}

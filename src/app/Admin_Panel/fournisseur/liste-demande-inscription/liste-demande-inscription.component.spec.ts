import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeInscriptionComponent } from './liste-demande-inscription.component';

describe('ListeDemandeInscriptionComponent', () => {
  let component: ListeDemandeInscriptionComponent;
  let fixture: ComponentFixture<ListeDemandeInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDemandeInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandeInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

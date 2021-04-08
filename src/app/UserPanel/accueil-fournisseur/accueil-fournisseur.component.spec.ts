import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilFournisseurComponent } from './accueil-fournisseur.component';

describe('AccueilFournisseurComponent', () => {
  let component: AccueilFournisseurComponent;
  let fixture: ComponentFixture<AccueilFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

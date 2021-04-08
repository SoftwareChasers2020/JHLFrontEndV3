import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFournisseurComponent } from './demande-fournisseur.component';

describe('DemandeFournisseurComponent', () => {
  let component: DemandeFournisseurComponent;
  let fixture: ComponentFixture<DemandeFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

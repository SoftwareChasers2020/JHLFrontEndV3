import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilAdministrateurComponent } from './accueil-administrateur.component';

describe('AccueilAdministrateurComponent', () => {
  let component: AccueilAdministrateurComponent;
  let fixture: ComponentFixture<AccueilAdministrateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilAdministrateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

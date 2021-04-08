import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGestionnaireDepotComponent } from './add-gestionnaire-depot.component';

describe('AddGestionnaireDepotComponent', () => {
  let component: AddGestionnaireDepotComponent;
  let fixture: ComponentFixture<AddGestionnaireDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGestionnaireDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGestionnaireDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

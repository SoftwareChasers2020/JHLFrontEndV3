import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGestionnaireDepotComponent } from './edit-gestionnaire-depot.component';

describe('EditGestionnaireDepotComponent', () => {
  let component: EditGestionnaireDepotComponent;
  let fixture: ComponentFixture<EditGestionnaireDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGestionnaireDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGestionnaireDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

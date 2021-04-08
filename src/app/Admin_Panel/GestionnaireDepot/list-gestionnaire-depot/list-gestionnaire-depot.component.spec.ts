import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGestionnaireDepotComponent } from './list-gestionnaire-depot.component';

describe('ListGestionnaireDepotComponent', () => {
  let component: ListGestionnaireDepotComponent;
  let fixture: ComponentFixture<ListGestionnaireDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGestionnaireDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGestionnaireDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

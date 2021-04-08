import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdministrateurComponent } from './edit-administrateur.component';

describe('EditAdministrateurComponent', () => {
  let component: EditAdministrateurComponent;
  let fixture: ComponentFixture<EditAdministrateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdministrateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

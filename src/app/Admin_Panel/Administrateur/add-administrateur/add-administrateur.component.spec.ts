import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdministrateurComponent } from './add-administrateur.component';

describe('AddAdministrateurComponent', () => {
  let component: AddAdministrateurComponent;
  let fixture: ComponentFixture<AddAdministrateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdministrateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLivreurComponent } from './edit-livreur.component';

describe('EditLivreurComponent', () => {
  let component: EditLivreurComponent;
  let fixture: ComponentFixture<EditLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

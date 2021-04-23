import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColisAdminComponent } from './edit-colis-admin.component';

describe('EditColisAdminComponent', () => {
  let component: EditColisAdminComponent;
  let fixture: ComponentFixture<EditColisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditColisAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewColisAdminComponent } from './new-colis-admin.component';

describe('NewColisAdminComponent', () => {
  let component: NewColisAdminComponent;
  let fixture: ComponentFixture<NewColisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewColisAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewColisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

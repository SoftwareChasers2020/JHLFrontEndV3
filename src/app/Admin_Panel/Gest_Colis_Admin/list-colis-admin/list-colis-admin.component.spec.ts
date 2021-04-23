import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColisAdminComponent } from './list-colis-admin.component';

describe('ListColisAdminComponent', () => {
  let component: ListColisAdminComponent;
  let fixture: ComponentFixture<ListColisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColisAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

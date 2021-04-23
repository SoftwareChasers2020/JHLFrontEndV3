import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailColisAdminComponent } from './detail-colis-admin.component';

describe('DetailColisAdminComponent', () => {
  let component: DetailColisAdminComponent;
  let fixture: ComponentFixture<DetailColisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailColisAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailColisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

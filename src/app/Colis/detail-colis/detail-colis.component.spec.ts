import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailColisComponent } from './detail-colis.component';

describe('DetailColisComponent', () => {
  let component: DetailColisComponent;
  let fixture: ComponentFixture<DetailColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailColisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

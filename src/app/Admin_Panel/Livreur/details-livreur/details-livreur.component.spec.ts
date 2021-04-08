import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLivreurComponent } from './details-livreur.component';

describe('DetailsLivreurComponent', () => {
  let component: DetailsLivreurComponent;
  let fixture: ComponentFixture<DetailsLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

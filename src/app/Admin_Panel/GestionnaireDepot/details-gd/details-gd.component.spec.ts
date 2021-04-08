import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGDComponent } from './details-gd.component';

describe('DetailsGDComponent', () => {
  let component: DetailsGDComponent;
  let fixture: ComponentFixture<DetailsGDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

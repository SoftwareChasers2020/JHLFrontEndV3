import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionFComponent } from './inscription-f.component';

describe('InscriptionFComponent', () => {
  let component: InscriptionFComponent;
  let fixture: ComponentFixture<InscriptionFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifesteComponent } from './manifeste.component';

describe('ManifesteComponent', () => {
  let component: ManifesteComponent;
  let fixture: ComponentFixture<ManifesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifesteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

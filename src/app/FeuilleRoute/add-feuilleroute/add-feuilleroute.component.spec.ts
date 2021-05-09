import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeuillerouteComponent } from './add-feuilleroute.component';

describe('AddFeuillerouteComponent', () => {
  let component: AddFeuillerouteComponent;
  let fixture: ComponentFixture<AddFeuillerouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeuillerouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeuillerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

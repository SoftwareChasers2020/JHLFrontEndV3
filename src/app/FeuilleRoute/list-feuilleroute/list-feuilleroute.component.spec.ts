import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeuillerouteComponent } from './list-feuilleroute.component';

describe('ListFeuillerouteComponent', () => {
  let component: ListFeuillerouteComponent;
  let fixture: ComponentFixture<ListFeuillerouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFeuillerouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeuillerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

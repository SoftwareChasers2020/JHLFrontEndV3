import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFeuilleRouteComponent } from './consulter-feuille-route.component';

describe('ConsulterFeuilleRouteComponent', () => {
  let component: ConsulterFeuilleRouteComponent;
  let fixture: ComponentFixture<ConsulterFeuilleRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterFeuilleRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterFeuilleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

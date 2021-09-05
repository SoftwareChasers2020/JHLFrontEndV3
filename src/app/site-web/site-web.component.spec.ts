import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteWebComponent } from './site-web.component';

describe('SiteWebComponent', () => {
  let component: SiteWebComponent;
  let fixture: ComponentFixture<SiteWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

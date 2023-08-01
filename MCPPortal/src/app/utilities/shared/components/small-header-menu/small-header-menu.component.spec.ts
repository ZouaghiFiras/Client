import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SmallHeaderMenuComponent} from './small-header-menu.component';

describe('SmallHeaderMenuComponent', () => {
  let component: SmallHeaderMenuComponent;
  let fixture: ComponentFixture<SmallHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallHeaderMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GridReactiveComponent} from './grid-reactive.component';

describe('GridReactiveComponent', () => {
  let component: GridReactiveComponent;
  let fixture: ComponentFixture<GridReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridReactiveComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

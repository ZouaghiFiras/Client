import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FinishPopupComponent} from './finish-popup.component';

describe('FinishPopupComponent', () => {
  let component: FinishPopupComponent;
  let fixture: ComponentFixture<FinishPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishPopupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

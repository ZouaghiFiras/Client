import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenericSettingsGridComponent} from './generic-settings-grid.component';

describe('GenericSettingsGridComponent', () => {
  let component: GenericSettingsGridComponent;
  let fixture: ComponentFixture<GenericSettingsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericSettingsGridComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericSettingsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

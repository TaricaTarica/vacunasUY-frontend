import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorVacunacionComponent } from './monitor-vacunacion.component';

describe('MonitorVacunacionComponent', () => {
  let component: MonitorVacunacionComponent;
  let fixture: ComponentFixture<MonitorVacunacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorVacunacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

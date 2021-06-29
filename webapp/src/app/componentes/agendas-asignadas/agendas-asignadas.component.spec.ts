import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasAsignadasComponent } from './agendas-asignadas.component';

describe('AgendasAsignadasComponent', () => {
  let component: AgendasAsignadasComponent;
  let fixture: ComponentFixture<AgendasAsignadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasAsignadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

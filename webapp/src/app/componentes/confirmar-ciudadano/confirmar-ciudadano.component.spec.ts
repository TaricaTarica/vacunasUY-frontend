import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCiudadanoComponent } from './confirmar-ciudadano.component';

describe('ConfirmarCiudadanoComponent', () => {
  let component: ConfirmarCiudadanoComponent;
  let fixture: ComponentFixture<ConfirmarCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarCiudadanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

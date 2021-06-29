import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoVacunacionComponent } from './certificado-vacunacion.component';

describe('CertificadoVacunacionComponent', () => {
  let component: CertificadoVacunacionComponent;
  let fixture: ComponentFixture<CertificadoVacunacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadoVacunacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticarseComponent } from './autenticarse.component';

describe('AutenticarseComponent', () => {
  let component: AutenticarseComponent;
  let fixture: ComponentFixture<AutenticarseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutenticarseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

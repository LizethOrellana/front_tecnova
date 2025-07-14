import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarContraseniaComponent } from './actualizar-contrasenia.component';

describe('ActualizarContraseniaComponent', () => {
  let component: ActualizarContraseniaComponent;
  let fixture: ComponentFixture<ActualizarContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarContraseniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarFooterComponent } from './actualizar-footer.component';

describe('ActualizarFooterComponent', () => {
  let component: ActualizarFooterComponent;
  let fixture: ComponentFixture<ActualizarFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionOcupadaComponent } from './habitacion-ocupada.component';

describe('HabitacionOcupadaComponent', () => {
  let component: HabitacionOcupadaComponent;
  let fixture: ComponentFixture<HabitacionOcupadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitacionOcupadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitacionOcupadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaInvestigacionComponent } from './grafica-investigacion.component';

describe('GraficaInvestigacionComponent', () => {
  let component: GraficaInvestigacionComponent;
  let fixture: ComponentFixture<GraficaInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaInvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

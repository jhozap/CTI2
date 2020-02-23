import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaProductoComponent } from './grafica-producto.component';

describe('GraficaProductoComponent', () => {
  let component: GraficaProductoComponent;
  let fixture: ComponentFixture<GraficaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoEmblematicoComponent } from './caso-emblematico.component';

describe('CasoEmblematicoComponent', () => {
  let component: CasoEmblematicoComponent;
  let fixture: ComponentFixture<CasoEmblematicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoEmblematicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoEmblematicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

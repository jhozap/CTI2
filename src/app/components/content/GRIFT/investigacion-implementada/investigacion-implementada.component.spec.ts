import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigacionImplementadaComponent } from './investigacion-implementada.component';

describe('InvestigacionImplementadaComponent', () => {
  let component: InvestigacionImplementadaComponent;
  let fixture: ComponentFixture<InvestigacionImplementadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigacionImplementadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigacionImplementadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

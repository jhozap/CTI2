import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigacionInstitucionalComponent } from './investigacion-institucional.component';

describe('InvestigacionInstitucionalComponent', () => {
  let component: InvestigacionInstitucionalComponent;
  let fixture: ComponentFixture<InvestigacionInstitucionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigacionInstitucionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigacionInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

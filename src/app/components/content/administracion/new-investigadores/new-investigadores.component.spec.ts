import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvestigadoresComponent } from './new-investigadores.component';

describe('NewInvestigadoresComponent', () => {
  let component: NewInvestigadoresComponent;
  let fixture: ComponentFixture<NewInvestigadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInvestigadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInvestigadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

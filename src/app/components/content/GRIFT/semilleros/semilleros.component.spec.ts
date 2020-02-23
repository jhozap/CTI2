import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemillerosComponent } from './semilleros.component';

describe('SemillerosComponent', () => {
  let component: SemillerosComponent;
  let fixture: ComponentFixture<SemillerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemillerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemillerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

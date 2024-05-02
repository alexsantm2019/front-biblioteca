import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVisitaComponent } from './reporte-visita.component';

describe('ReporteVisitaComponent', () => {
  let component: ReporteVisitaComponent;
  let fixture: ComponentFixture<ReporteVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteVisitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

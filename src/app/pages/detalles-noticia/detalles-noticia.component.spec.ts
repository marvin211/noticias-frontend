import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesNoticiaComponent } from './detalles-noticia.component';

describe('DetallesNoticiaComponent', () => {
  let component: DetallesNoticiaComponent;
  let fixture: ComponentFixture<DetallesNoticiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesNoticiaComponent]
    });
    fixture = TestBed.createComponent(DetallesNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSpaceComponent } from './canvas-space.component';

describe('CanvasSpaceComponent', () => {
  let component: CanvasSpaceComponent;
  let fixture: ComponentFixture<CanvasSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

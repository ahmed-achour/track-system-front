import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTruckComponent } from './single-truck.component';

describe('SingleTruckComponent', () => {
  let component: SingleTruckComponent;
  let fixture: ComponentFixture<SingleTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

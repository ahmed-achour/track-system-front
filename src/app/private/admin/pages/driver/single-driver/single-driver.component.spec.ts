import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDriverComponent } from './single-driver.component';

describe('SingleDriverComponent', () => {
  let component: SingleDriverComponent;
  let fixture: ComponentFixture<SingleDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

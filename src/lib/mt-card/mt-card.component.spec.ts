import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtCardComponent } from './mt-card.component';

describe('MtCardComponent', () => {
  let component: MtCardComponent;
  let fixture: ComponentFixture<MtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

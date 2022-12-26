import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtPageComponent } from './mt-page.component';

describe('MtPageComponent', () => {
  let component: MtPageComponent;
  let fixture: ComponentFixture<MtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

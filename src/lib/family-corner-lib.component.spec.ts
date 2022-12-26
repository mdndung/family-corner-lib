import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCornerLibComponent } from './family-corner-lib.component';

describe('FamilyCornerLibComponent', () => {
  let component: FamilyCornerLibComponent;
  let fixture: ComponentFixture<FamilyCornerLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyCornerLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyCornerLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

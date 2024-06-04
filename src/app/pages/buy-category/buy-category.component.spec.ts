import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCategoryComponent } from './buy-category.component';

describe('BuyCategoryComponent', () => {
  let component: BuyCategoryComponent;
  let fixture: ComponentFixture<BuyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

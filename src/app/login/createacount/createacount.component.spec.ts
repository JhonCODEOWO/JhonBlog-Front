import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateacountComponent } from './createacount.component';

describe('CreateacountComponent', () => {
  let component: CreateacountComponent;
  let fixture: ComponentFixture<CreateacountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateacountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateacountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

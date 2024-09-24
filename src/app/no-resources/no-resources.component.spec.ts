import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResourcesComponent } from './no-resources.component';

describe('NoResourcesComponent', () => {
  let component: NoResourcesComponent;
  let fixture: ComponentFixture<NoResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

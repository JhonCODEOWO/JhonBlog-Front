import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPermComponent } from './roles-perm.component';

describe('RolesPermComponent', () => {
  let component: RolesPermComponent;
  let fixture: ComponentFixture<RolesPermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesPermComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesPermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideMenuAdminComponent } from './aside-menu-admin.component';

describe('AsideMenuAdminComponent', () => {
  let component: AsideMenuAdminComponent;
  let fixture: ComponentFixture<AsideMenuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsideMenuAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideMenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

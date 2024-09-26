import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsInicioComponent } from './posts-inicio.component';

describe('PostsInicioComponent', () => {
  let component: PostsInicioComponent;
  let fixture: ComponentFixture<PostsInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

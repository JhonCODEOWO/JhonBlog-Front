import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { PostsService } from './manage-posts/posts/posts.service';
import { Article } from './manage-posts/posts/post.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private postService: PostsService, private toastService: ToastrService){}

  posts: Article[] | null = null;

  ngOnInit(): void {
      this.postService.loadPosts();
      this.postService.$posts.subscribe({
        next: (posts: Article[] | null)=>{
          this.posts = posts;
        },
        error: (error)=>{
          
        }
      }); 
  }

  ngOnDestroy(): void {
      this.postService.clearAllData();
  }
}

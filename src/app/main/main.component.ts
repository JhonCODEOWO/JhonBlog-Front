import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { PostsService } from '../posts/posts.service';
import { Article } from '../posts/post.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
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
}

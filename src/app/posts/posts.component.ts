import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';
import { ActivatedRoute } from '@angular/router';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from './posts.service';
import { Article } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  constructor(private toastService: ToastrService,private loginService: LoginService, private route: ActivatedRoute, private postService: PostsService){}
  faAdd = faAdd;
  articles: Article[] | null = null;

  ngOnInit(): void {
    this.postService.loadPostOfUser();
    this.postService.$postsUser.subscribe({
      next: (articles: Article[] | null)=>{
        this.articles = articles;
      },
      error: (error)=>{
        this.toastService.error('Ha ocurrido un error grave, recarga completamente la página, y si este error sigue apareciendo, reportalo al desarrollador.');
      }
    })
  }
}

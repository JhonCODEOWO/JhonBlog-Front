import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../post.model';
import { LoginService } from '../../../../login/login.service';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-inicio',
  templateUrl: './posts-inicio.component.html',
  styleUrl: './posts-inicio.component.css'
})
export class PostsInicioComponent implements OnInit, OnDestroy{
  constructor(private toastService: ToastrService, private loginService: LoginService, private route: ActivatedRoute, private postService: PostsService){}
  articles: Article[] | null = null;

  ngOnInit(): void {
    this.postService.loadPostOfUser();
    this.postService.$postsUser.subscribe({
      next: (articles: Article[] | null)=>{
        this.articles = articles;
        console.log(this.articles);
      },
      error: (error)=>{
        this.toastService.error('Ha ocurrido un error grave, recarga completamente la página, y si este error sigue apareciendo, reportalo al desarrollador.');
      }
    })
  }

  ngOnDestroy(): void {
    this.postService.clearAllDataOnUsers();
}
}

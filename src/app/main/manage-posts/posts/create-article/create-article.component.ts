import { Component } from '@angular/core';
import { Article } from '../post.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent {
  constructor(private toastService: ToastrService){}
  article: Article = new Article();

  onSubmit(f: NgForm){
    if (f.valid) {
      return true;
    }
    this.toastService.warning('No has llenado los campos obligatorios para proceder');
    return false;
  }
  viewData(){
    console.log(this.article);
  }
}

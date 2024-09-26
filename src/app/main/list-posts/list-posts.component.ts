import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../manage-posts/posts/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent implements OnInit, OnDestroy{
  constructor(private route: ActivatedRoute, private loginService: LoginService){}
  
  @Input() articles: Article[] | null = null;

  /**
   * Propiedad usada para verificar en la plantilla si debe mostrar o no elementos CRUD al usuario.
   * @type {boolean}
   * @public
   */
  isUserManaging: boolean = false;

  ngOnInit(): void {
      //Obtener un valor de la url para saber si el componente está siendo renderizado en una ruta de un usuario.
      const idUser: number | null = isNaN(Number.parseInt(this.route.snapshot.params['id']))?null: Number.parseInt(this.route.snapshot.params['id']);
      
      //Verificar si se ha obtenido un valor
      if (idUser) {
        //Si el usuario está logeado y además coincide su id con el valor actual.
        (this.loginService.matchWithUserLogged(idUser) && this.loginService.isAutenticated())? this.isUserManaging = true : this.isUserManaging=false;
      }
  }

  ngOnDestroy(): void {
      this.articles = null;
  }
}

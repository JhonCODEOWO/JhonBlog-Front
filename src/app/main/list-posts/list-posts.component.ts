import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Article } from '../manage-posts/posts/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { PostsService } from '../manage-posts/posts/posts.service';
import { faPen, faTrashCan, faGear, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent implements OnInit,OnChanges{
  constructor(private route: ActivatedRoute, private loginService: LoginService, private postService: PostsService){}
  faTrashCan = faTrashCan;
  faPen = faPen;
  faGear = faGear;
  faEye = faEye;
  faHeart = faHeart;

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

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['articles']) {
        console.log('Cambios en la propiedad articles:', changes['articles']);
      }
  }
}

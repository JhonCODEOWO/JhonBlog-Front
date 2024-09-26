import { Component, OnInit } from '@angular/core';
import { User } from '../../administracion/roles-perm/users/user.model';
import { UserServices } from '../../administracion/roles-perm/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Utils } from '../../utils';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent implements OnInit {
  constructor(
    private userService: UserServices,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  user: User | null = null;
  isCurrentUser: boolean = false; //False si el usuario que ingresó no es igual al que esta logeado
  notFound: boolean = true;// Para identificar si el recurso fué encontrado.
  isLogged: boolean = false; //Para verificar si el usuario está logeado.

  ngOnInit(): void {
    //Obtener el id de la url
    const id = this.route.snapshot.params['id'];

    //Realizar la petición
    this.userService.getUser(id).subscribe({
      next: (user: User) => {
        this.user = user; //Asigna el usuario hacia la propiedad de la plantilla
        (this.loginService.matchWithUserLogged(user.id))?this.isCurrentUser=true: this.isCurrentUser=false; //Verificar si el usuario que ha ingresado coincide con el usuario recibido.
        (this.loginService.isAutenticated())?this.isLogged=true:this.isLogged=false; //Verifica si el usuario que ha ingresado está logeado o no

      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 404:
            this.notFound = false;
            break;
        
          default:
            break;
        }
      },
    });
  }

  getResourceFromServer(path: string | null | undefined): string {
    if (path) {
      const urlServer = Utils.getUrlServer();
      return Utils.getUrlResourceFromServer(urlServer, path);
    }
    return '';
  }
}

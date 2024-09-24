import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DataCSRF } from './dataCSRF.service';
import { Csrf } from './csrf.model';
import { LoginService } from './login/login.service';
import { User } from './administracion/roles-perm/users/user.model';
import { Permission } from './administracion/permission.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'jhonblog-frontend';
  logeado: boolean = false;
  user: User|null = null;
  permissions: Permission[] | null = null;

  constructor(private csrfService:DataCSRF, private loginService: LoginService, private toastService: ToastrService){}
  
  ngOnInit(): void {
      this.csrfService.getCsrfToken();

      //Suscripción hacia la propiedad userLogged para recibir cambios.
      this.loginService.userLogged$.subscribe({
        next: (user: User | null)=>{ //Recepción de un nuevo valor en la suscripción.
          //Si el usuario es diferente de nulo es porque ya hay algo logeado
          if (user != null) {
            this.logeado = this.loginService.isAutenticated();
            this.user = user;
          }else{
            this.logeado = false;
            this.user = null;
          }
        }
      })

      //Suscripción para obtener los permisos almacenados en un usuario
      this.loginService.userPermissions$.subscribe({
        next: (permissions: Permission[] | null)=>{ //Obtenci+on de nuevos permisos.
          this.permissions=permissions;
        },
        error: (error: HttpErrorResponse)=>{
          this.toastService.error(`Ha ocurrido un error al obtener los datos de los permisos desde login.service -> userPermissions$ ${error.message}`);
        }
      })
  }

  ngOnDestroy(): void {
      this.csrfService.tokenActual = '';
  }
}
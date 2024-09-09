import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DataCSRF } from './dataCSRF.service';
import { Csrf } from './csrf.model';
import { LoginService } from './login/login.service';
import { User } from './administracion/roles-perm/users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'jhonblog-frontend';
  logeado: boolean = false;
  user: User|null = null;

  constructor(private csrfService:DataCSRF, private loginService: LoginService){}
  
  ngOnInit(): void {
      this.csrfService.getCsrfToken();

      //Suscripción hacia la propiedad userLogged para recibir cambios.
      this.loginService.userLogged$.subscribe({
        next: (user: User | null)=>{
          //Si el usuario es diferente de nulo es porque ya hay algo logeado
          if (user != null) {
            this.logeado = true;
            this.user = user;
          }else{
            this.logeado = false;
            this.user = null;
          }
        }
      })
  }

  ngOnDestroy(): void {
      this.csrfService.tokenActual = '';
  }
}
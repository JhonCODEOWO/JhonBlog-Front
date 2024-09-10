import { Component, Input, input } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../administracion/roles-perm/users/user.model';
import { LoginService } from '../login/login.service';
import { InfoRequest } from '../request_info.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DataCSRF } from '../dataCSRF.service';
import { Permission } from '../administracion/permission.model';
import { Utils } from '../utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),  // Estado inicial cuando el elemento no está presente en el DOM
      transition(':enter, :leave', [          // Transición para entrar y salir del DOM
        animate(300)                          // Duración de la animación en ms
      ])
    ])
  ]
})
export class HeaderComponent{
  constructor(private loginService: LoginService, private toastService: ToastrService, private csrf: DataCSRF){}
  //Iconos usados
  faCaredDown = faCaretDown;
  faCaredUp = faCaretUp;

  role: string = '';
  @Input() logeado !:boolean; //Estado de logeo
  @Input() actualUser !: User | null; //Usuario proporcionado
  @Input() userPermissions !: Permission[] | null; //Permisos proporcionados
  menuVisible: Boolean = false;

  deslogear(){
    this.loginService.logout().subscribe({
      next: (response: InfoRequest)=>{
        if (response.status == 'ok') {
          this.logeado = false; //Quitar estado de logeo
          this.loginService.setUser(null) //Quitar el usuario del servicio
          this.csrf.getCsrfToken(); //Reasignar el nuevo csrf token
          this.toastService.warning(response.message);
        }
      },
      error: (error: HttpErrorResponse)=>{
        this.toastService.error(`Ha ocurrido un error al llevar a cabo esta acción: ${error.status}`);
      }
    });
  }

  showMenu(){
    if (this.menuVisible) {
      this.menuVisible = false;
    }else{
      this.menuVisible = true;
    }
  }

  findPermission(permission: string): boolean{
    return Utils.findPermission(permission, this.userPermissions);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../administracion/roles-perm/users/user.model';
import { LoginService } from './login.service';
import { InfoRequest } from '../request_info.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataCSRF } from '../dataCSRF.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private toastService: ToastrService, private loginService: LoginService, private router: Router, private csrf: DataCSRF){}
  
  email!:string; //Propiedad inicializada en undefined pues provendrá siempre de los inputs
  password!:string; //Propiedad inicializada en undefined pues provendrá siempre de los inputs
  message: string = ''; //Inicializado como un string vacío.

  ngOnInit(): void {
      
  }

  //Intenta logear un usuario usando el servicio login.service
  login(){
    //Si el método validarDatos da un resultado negativo.
    if (!this.validarDatos()) {
      this.toastService.error('No se puede iniciar sesión si no has colocado todos los datos');
    }else{
      //Ejecutamos el intento de inicio de sesión del lado del servidor.
      this.loginService.login(this.email, this.password).subscribe({
        next: (response: User|InfoRequest)=>{
          //Verificar que tipo de objeto se ha recibido
          if ('name' in response) { //Si name existe en la respuesta quiere decir que es un objeto de usuario
            console.log(response);
            this.loginService.setUser(response); //Aplicar el usuario actual por medio del servicio login.service
            this.loginService.setPermissions(response); //Recorrer roles y almacenar los permisos en un arreglo del servicio
            this.csrf.getCsrfToken(); // Tomamos nuevamente el token pues ahora ya ha cambiado
            this.message = ''; //Vacíar el mensaje, para asegurarnos de que siempre esté vacío si ya se ha logeado.
            this.router.navigate(['/']); //Redireccionar a la página inicial
          }else{ //Si la declaración anterior da false es porque es un objeto InfoRequest
            this.message = response.message; //Almacenar el resultado del error en el mensaje
          }
        },
        error: (error: HttpErrorResponse)=>{
          this.toastService.error(`Ha ocurrido un error al realizar la solicitud con el servidor para el login: ` + error.status);
        }
      });
    }
  }

  //Método para manejar el submit del formulario de login
  onSubmit(formulario:NgForm){

    //Validar si el formulario es válido
    if (!formulario.valid) {
      this.toastService.error('No se puede realizar la operación, no has ingresado los datos requeridos');
      return;
    }

    //Si es válido entonces ejecuta el método login
    this.login();
    return;
  }

  //Valida las propiedades email y contraseña para verificar que tengan algún dato o estén declarados sin ser undefined
  validarDatos():boolean{
    if (this.email=='' ||this.password=='' || !this.email || !this.password) {
      return false;
    }
    return true;
  }
}

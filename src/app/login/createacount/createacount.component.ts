import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../administracion/roles-perm/users/user.model';
import { UserServices } from '../../administracion/roles-perm/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { InfoRequest } from '../../request_info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createacount',
  templateUrl: './createacount.component.html',
  styleUrl: './createacount.component.css'
})
export class CreateacountComponent {
  constructor(private userService: UserServices, private toastService: ToastrService, private router:Router){}
  //Propiedades para la creación de una cuenta
  creatingAcount: boolean = true;
  email!: string;
  password!: string;
  name!: string;
  password_confirmation!:string;
  errors: any = [];

  onSubmit(form: NgForm){
    if (form.valid) {
      this.createUser();
      return true;
    }
    return false
  }

  createUser(){
    this.userService.addUser(this.name, this.email, this.password).subscribe({
      next: (response: InfoRequest)=>{
        if (response.status=='ok') {
          this.router.navigate(['/login']);
        }else{
          this.toastService.error(response.message);
        }
      },
      error: (error: HttpErrorResponse)=>{
        if (error.status == 422) {
          //Asignamos a la propiedad errors del componente los errores dados por laravel para poder mostrarlos en la plantilla.
          this.errors = error.error.errors;

          //Después de dos segundos vaciamos los errores
          setTimeout(() => {
            this.errors = [];
          }, 5000);
        }
      }
    })
  }

  validarDatos(): boolean{
    if (this.email && this.password && this.name && this.password_confirmation != '' && this.password == this.password_confirmation) {
      return true;
    }
    return false;
  }
}

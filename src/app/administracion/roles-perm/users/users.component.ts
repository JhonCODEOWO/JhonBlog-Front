import { Component, input, Input, ViewChild } from '@angular/core';
import { User } from './user.model';
import { SwalPortalTargets, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormControl, NgForm } from '@angular/forms';
import { UserServices } from './users.service';
import { InfoRequest } from '../../../request_info.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(
    readonly swalTargets: SwalPortalTargets,
    private userService: UserServices,
    private toastService: ToastrService
  ) {}

  @Input() users: User[] = [];
  @ViewChild('addUserModal') readonly addUserModal!: SwalComponent;
  @ViewChild('showUserModal') readonly showUserModal!: SwalComponent;

  //Propiedades para el manejo de formularios.
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  errors: any = [];

  //
  userFinded!: User | undefined;

  //Obtiene un registro del arreglo de objetos de usuarios en base a su id, puede ser indefinido
  getUser(userRequest: User): User | undefined {
    return this.users.find((user) => user.id == userRequest.id);
  }

  //Obtiene el índice de un objeto user en el arreglo users, si existe devuelve el índice y si no devuelve un indefinido
  getUserIndex(user: User | undefined): number | undefined {
    if (user != undefined) {
      return this.users.indexOf(user);
    }
    return undefined;
  }

  cleanData() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.password_confirmation = '';
    this.errors = [];
    this.userFinded = undefined;
  }

  //Método para añadir un usuario
  addUser(formUser: NgForm) {
    //Se consume el servicio de añadir usuario
    this.userService.addUser(this.name, this.email, this.password).subscribe({
      next: (info: InfoRequest) => {
        //Si la respuesta es ok...
        if (info.status == 'ok') {
          this.userService.getUsers();
          this.toastService.success(info.message);
          this.addUserModal.close();
          this.cleanData();
        } else {
          this.toastService.error(info.message);
        }
      },
      //Manejamos los errores de la petición posibles
      error: (responseError: HttpErrorResponse) => {
        //Si el error recibido es 422 quiere decir que proviene de un formrequest de laravel
        if (responseError.status == 422) {
          //Asignamos a la propiedad errors del componente los errores dados por laravel para poder mostrarlos en la plantilla.
          this.errors = responseError.error.errors;

          //Después de dos segundos vaciamos los errores
          setTimeout(() => {
            this.errors = [];
          }, 2000);
        }
      },
    });
  }

  //Elimina un usuario del arreglo local y realiza la petición para el backend
  deleteUser(user: User | undefined) {
    this.showUserModal.close();

    const index: number | undefined = this.getUserIndex(user);

    //Si index está con un valor definido..
    if (index != undefined && user != undefined) {
      this.userService.deleteUser(user).subscribe({
        next: (info: InfoRequest) => {
          if (info.status == 'ok') {
            this.users.splice(index, 1);
            this.cleanData();
            this.toastService.success(info.message);
          }
        },
        error: (error) => {
          this.toastService.error(
            'Ha ocurrido un error al realizar la petición al servidor'
          );
          console.error(error);
        },
      });
    } else {
      this.toastService.error(
        'Ha ocurrido un error, parece que el usuario que intentas eliminar no existe'
      );
    }
  }

  showUser(user: User) {
    this.userFinded = this.getUser(user);
  }

  //Método para realizar acciones si el usuario da click fuera del modal o lo cierra
  handleDissmiss() {
    this.cleanData();
  }
}

import { Component, OnInit } from '@angular/core';
import { general_data } from '../administracion/general_data.service';
import { User } from '../administracion/roles-perm/users/user.model';
import { UserServices } from '../administracion/roles-perm/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../administracion/role.model';
import { RolePermissionsService } from '../administracion/roles-permissions.service';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { InfoRequest } from '../request_info.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.css',
})
export class ModifyUserComponent implements OnInit {
  constructor(
    private generalData: general_data,
    private userService: UserServices,
    private toastService: ToastrService,
    private rolesService: RolePermissionsService
  ) {}


  /* Lógica pendiente de agregar:
    * El componente debe validar si el usuario que ingresó al componente tiene permisos de manage_users, admin_access para modificar datos de los usuarios registrados.
    * Si el usuario no cuenta con esos dos permisos entonces es un usuario normal, por lo que se debe permitir solo modificar los datos personales de perfil y cuenta.
  */

  //Icons
  faPlus = faPlus;
  faTrash = faTrash;

  roles: Role[] = [];
  userSeletected: User | undefined = undefined;
  name: string = '';

  ngOnInit(): void {
    //Al iniciar el componente se suscribe por cambios en la propiedad selectedUser
    this.userService.selectedUser$.subscribe({
      next: (user: User | undefined) => {
        if (user != undefined) {
          this.userSeletected = user;

          //Obtiene los datos que ya deberían estar cargados en los roles anteriormente
          this.rolesService.getRolesForUsers(user).subscribe({
            next: (response: Role[]) => {
              this.roles = response;
            },
            error: (error) => {
              this.toastService.error(
                'Ha ocurrido un error al obtener los roles disponibles para el usuario'
              );
            },
          });
        }
      },
      error: (error) => {
        this.toastService.error(
          'No se ha podido obtener el usuario solicitado'
        );
        console.error(error);
      },
    });
    this.generalData.setTittle('Editando usuario');
  }

  //Método para actualizar datos del usuario
  updateUser(form: NgForm){
    //Almacenar datos de los inputs para su posterior procesamiento.
    const name = form.value.name;
    const email = form.value.email;

    //Ejecutar petición que actualice los datos en el backend.

  }

  addRoleToUser(role: Role, user: User) {
    //Realizar petición para realizar acciones si es éxitosa
    this.userService.addRoleToUser(role, user).subscribe({
      next: (info: InfoRequest) => {
        if (info.status == 'ok') {
          //Añadir el rol al usuario
          const index = this.roles.indexOf(role);
          user.roles.push(role);
          //Quitar el role asignado de los roles disponibles
          this.roles.splice(index, 1);

          this.rolesService.getRolesForUsers(user).subscribe({
            next: (response: Role[]) => {
              this.roles = response;
            },
            error: (error) => {
              this.toastService.error(
                'Ha ocurrido un error al obtener los roles disponibles para el usuario'
              );
            },
          });

          this.toastService.success(info.message);
        } else {
          this.toastService.error(info.message);
        }
      },
      error: (error) => {
        this.toastService.error(
          'Ha ocurrido un error al realizar la operación'
        );
        console.error(error);
      },
    });
  }

  deleteRoleFromUser(user: User, role: Role) {
    //Hacemos la peticion hacia la petición que elimina el role de un usuario
    this.userService.deleteRoleFromUser(user, role).subscribe({
      next: (response: InfoRequest) => {
        if ((response.status = 'ok')) {
          //Quitar el role del usuario de manera local
          const indexRoleOnUser = user.roles.indexOf(role); //Encuentra el índice dentro de los roles del usuario
          user.roles.splice(indexRoleOnUser, 1); //Elimina en base al índice
          
          //Añadirlo nuevamente al arreglo de roles
          this.roles.push(role); //Regresa el elemento a los roles

          this.toastService.success(response.message);
        } else {
          this.toastService.error(response.message);
        }
      },
      error: (error) => {
        this.toastService.error('Ha ocurrido un error al llevar a cabo esta operación.');
        console.error(error);
      },
    });
  }
}

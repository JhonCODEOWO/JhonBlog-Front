import { AfterViewInit, Component, OnInit } from '@angular/core';
import { general_data } from '../general_data.service';
import { DataCSRF } from '../../dataCSRF.service';
import { RolePermissionsService } from '../roles-permissions.service';
import { Role } from '../role.model';
import { User } from './users/user.model';
import { UserServices } from './users/users.service';

@Component({
  selector: 'app-roles-perm',
  templateUrl: './roles-perm.component.html',
  styleUrl: './roles-perm.component.css'
})
export class RolesPermComponent implements OnInit {
  constructor(private generalData: general_data, private csrfService: DataCSRF, private rolespermissionService:RolePermissionsService, private userService: UserServices){}
  tittle: string = 'Roles y permisos';
  roles: Role[] = [];
  users: User[] = [];

  ngOnInit(): void {
    this.generalData.setTittle(this.tittle);
    this.rolespermissionService.getRoles();
    this.userService.getUsers();

    //Suscripción a los cambios de roles$ en el servicio
    this.rolespermissionService.roles$.subscribe(
      {
        next: (data: Role[])=>{
          this.roles = data;
        },
        error: (error)=>{
          console.log(error);
        }
      }
    );

    //Suscripción a los cambios de la propiedad users$ del servicio users.service
    this.userService.users$.subscribe({
      next: (users:User[])=>{
        this.users = users;
      },
      error: (error)=>{
        console.error(error);
      }
    })
  }
}

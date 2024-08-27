import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../role.model';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { RolePermissionsService } from '../../roles-permissions.service';
import { InfoRequest } from '../../../request_info.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  constructor(
    private rolepermissionService: RolePermissionsService,
    private toastService: ToastrService
  ) {}

  faTrash = faTrash;
  faPencil = faPencil;
  showModal: boolean = false;

  name!: string;
  description!: string;
  infoRequest: InfoRequest | undefined = undefined;

  roleFinded: Role | undefined;
  @Input() roles: Role[] = [];

  ngOnInit(): void {
    console.log(this.roles);
  }

  showRole(role: Role) {
    //Obtener el id del registro
    let id: number = role.id;

    //Encontrar el registro en el arreglo de objetos de este componente
    let result: Role | undefined = this.roles.find((role) => role.id === id);

    //Guardar los datos en la propiedad
    if (result) {
      this.roleFinded = result;
      this.name = result.name;
      this.description = result.description;
    } else {
      console.log('No se ha encontrado en la colección');
    }
  }

  closeModal() {
    this.roleFinded = undefined;
    this.name = '';
    this.description = '';
  }

  actualizarElemento(role: Role) {
    role.name = this.name;
    role.description = this.description;

    this.rolepermissionService.updateRole(role).subscribe({
      next: (data: InfoRequest) => {
        this.infoRequest = data;
        if (this.infoRequest?.status == 'ok') {
          this.toastService.success(this.infoRequest.message);
          
          //Reiniciar valores
          this.name = '';
          this.description = '';
          
        }else{
          console.log(this.infoRequest?.message);
          this.toastService.error(this.infoRequest?.message);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteRole(role:Role){
    //Obtenemos el indice del elemento obtenido
    let indexOfArray = this.roles.indexOf(role);

    //Eliminamos el objeto del arreglo del componente padre compartido por input
    this.roles.splice(indexOfArray, 1);

    this.rolepermissionService.deleteRole(role).subscribe({
      next: (response: InfoRequest)=>{
        if (response.status == 'ok') {
          this.toastService.success(response.message);
        }else{
          this.toastService.error(response.message);
        }
      },
      error: (error)=>{
        this.toastService.error(error);
      }
    })
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../role.model';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { RolePermissionsService } from '../../roles-permissions.service';
import { InfoRequest } from '../../../request_info.model';
import { ToastrService } from 'ngx-toastr';
import { SwalPortalTargets, SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  constructor(
    private rolepermissionService: RolePermissionsService,
    private toastService: ToastrService,
    public readonly swalTargets: SwalPortalTargets
  ) {}

  @ViewChild('addElementSwal')
  public readonly addRoleSwal!: SwalComponent;

  //Iconos utilizados
  faTrash = faTrash;
  faPencil = faPencil;
  showModal: boolean = false;

  //Propiedades utilizadas.
  name: string = '';
  description: string = '';
  roleFinded: Role | undefined;
  @Input() roles: Role[] = [];

  ngOnInit(): void {
    
  }

  //En base al id del objeto rol recibido se obtiene su instancia dentro de la colección roles.
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

  //Método que se ejecuta al pulsar cerrar modal
  closeModal() {
    //Reinicia los valores y aplica un undefined para que la plantilla lo detecte y quite el modal.
    this.roleFinded = undefined;
    this.name = '';
    this.description = '';
  }

  addRole() {
    //Verificar que las propiedades no estén vacías.
    if (this.name != '' && this.description != '') {
      //Consumir petición mediante el servicio.
      this.rolepermissionService
        .addRole(this.name, this.description)
        .subscribe({
          next: (data: InfoRequest) => {
            if (data.status == 'ok') {
              //Recargar los elementos usando el servicio
              this.rolepermissionService.getRoles();
              this.toastService.success('Elemento añadido correctamente');
            } else {
              this.toastService.error(data.message);
            }

            //Limpiar propiedades
            this.name = '';
            this.description = '';
          },
          error: (error) => {
            this.toastService.error('Ha ocurrido un error en la petición.');
          },
        });
    } else if (this.name.length > 15 && this.description.length > 50) {
      this.toastService.error(
        'No se añadió el registro, respeta que ambos campos tengan la longitud aceptada.'
      );
    } else {
      this.toastService.error(
        'No se añadió el registro, debes llenar todos los campos.'
      );
    }
  }

  //Ejecuta una petición del servicio para actualizar un rol.
  actualizarElemento(role: Role) {
    role.name = this.name;
    role.description = this.description;

    this.rolepermissionService.updateRole(role).subscribe({
      next: (data: InfoRequest) => {
        if (data.status == 'ok') {
          this.toastService.success(data.message);

          //Reiniciar valores
          this.name = '';
          this.description = '';
        } else {
          this.toastService.error(data.message);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteRole(role: Role) {
    //Obtenemos el indice del elemento obtenido
    let indexOfArray = this.roles.indexOf(role);

    //Eliminamos el objeto del arreglo del componente padre compartido por input
    this.roles.splice(indexOfArray, 1);

    this.rolepermissionService.deleteRole(role).subscribe({
      next: (response: InfoRequest) => {
        if (response.status == 'ok') {
          this.toastService.success(response.message);
        } else {
          this.toastService.error(response.message);
        }
      },
      error: (error) => {
        this.toastService.error(error);
      },
    });
  }
}

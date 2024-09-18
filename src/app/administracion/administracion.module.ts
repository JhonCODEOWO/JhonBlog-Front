import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsideMenuAdminComponent } from './aside-menu-admin/aside-menu-admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { InicioComponent } from './inicio/inicio.component';
import { general_data } from './general_data.service';
import { RolesPermComponent } from './roles-perm/roles-perm.component';
import { RolePermissionsService } from './roles-permissions.service';
import { RolesComponent } from './roles-perm/roles/roles.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsersComponent } from './roles-perm/users/users.component';
import { UserServices } from './roles-perm/users/users.service';
import { CategoriesService } from './categorias/categories.service';


@NgModule({
  declarations: [
    AdministracionComponent,
    AsideMenuAdminComponent,
    HeaderAdminComponent,
    CategoriasComponent,
    InicioComponent,
    RolesPermComponent,
    RolesComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [
    general_data,
    RolePermissionsService,
    UserServices,
    CategoriesService
  ]
})
export class AdministracionModule { }

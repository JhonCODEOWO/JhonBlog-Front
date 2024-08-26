import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsideMenuAdminComponent } from './aside-menu-admin/aside-menu-admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { InicioComponent } from './inicio/inicio.component';
import { general_data } from './general_data.service';
import { RolesPermComponent } from './roles-perm/roles-perm.component';


@NgModule({
  declarations: [
    AdministracionComponent,
    AsideMenuAdminComponent,
    HeaderAdminComponent,
    CategoriasComponent,
    InicioComponent,
    RolesPermComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    general_data
  ]
})
export class AdministracionModule { }

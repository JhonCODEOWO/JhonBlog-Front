import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { AdministracionComponent } from './administracion.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { InicioComponent } from './inicio/inicio.component';
import { RolesPermComponent } from './roles-perm/roles-perm.component';
import { ModifyUserComponent } from '../modify-user/modify-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent,
    children: [
      {path:'index', component: InicioComponent},
      {path: 'categorias', component: CategoriasComponent},
      {path: 'permisos&roles', component: RolesPermComponent},
      {path: 'user', children:[
        {path: 'modify', component: ModifyUserComponent}
      ]},
      {path: '**', component: NotfoundComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }

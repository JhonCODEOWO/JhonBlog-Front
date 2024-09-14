import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { LoginGuard } from './login/loginGuard.service';
import { CreateacountComponent } from './login/createacount/createacount.component';
import { CreateprofileComponent } from './login/createprofile/createprofile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {path: '', component:MainComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profile/view/:id', component:ViewProfileComponent},
  {path: 'createacount', canActivate: [LoginGuard], component:CreateacountComponent},
  {path: 'createprofile', canActivate: [LoginGuard],component:CreateprofileComponent}, //Acceder a CreateProfile pero en modo de creación
  {path: 'profile/edit/:id', canActivate: [LoginGuard],component:CreateprofileComponent}, //Ruta para acceder al componente createprofile pero en modo edición
  {path: 'admin', canActivate: [LoginGuard], loadChildren: ()=> import('./administracion/administracion.module').then(m => m.AdministracionModule)},
  //Rutas para el control de un usuario
  {path: 'user', children: [
    {path: 'modify/:id', component:ModifyUserComponent} //Ruta para modificar un usuario
  ]},
  {path: '**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

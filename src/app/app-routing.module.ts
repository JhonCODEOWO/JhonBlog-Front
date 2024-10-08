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
import { ViewProfileComponent } from './main/view-profile/view-profile.component';
import { PostsComponent } from './main/manage-posts/posts/posts.component';
import { MatchWithUserLoggedGuard } from './MatchUserLogged.service';
import { CreateArticleComponent } from './main/manage-posts/posts/create-article/create-article.component';
import { PostsInicioComponent } from './main/manage-posts/posts/posts-inicio/posts-inicio.component';

const routes: Routes = [
  //Rutas para componentes más generales
  {path: '', component:MainComponent},
  {path: 'login', component:LoginComponent},
  {path: 'createacount', component:CreateacountComponent},
  //Rutas pertenecientes a acciones de un usuario
  {path: 'profile/view/:id', component:ViewProfileComponent},
  {path: 'createprofile', canActivate: [LoginGuard],component:CreateprofileComponent}, //Acceder a CreateProfile pero en modo de creación
  {path: 'profile/edit/:id', canActivate: [LoginGuard],component:CreateprofileComponent}, //Ruta para acceder al componente createprofile pero en modo edición

  //Rutas que maneja el componente PostsComponent (Componente principal)
  {path: 'manageposts/:id', canActivate: [LoginGuard, MatchWithUserLoggedGuard], component: PostsComponent,
    children: [
      {path: 'create', component: CreateArticleComponent},
      {path: '', component: PostsInicioComponent},
    ]
  },
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

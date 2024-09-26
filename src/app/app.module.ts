import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {ToastrModule} from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './main/footer/footer.component';
import { AdministracionModule } from './administracion/administracion.module';
import { DataCSRF } from './dataCSRF.service';
import { provideHttpClient } from '@angular/common/http';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { LoginGuard } from './login/loginGuard.service';
import { CreateacountComponent } from './login/createacount/createacount.component';
import { CreateprofileComponent } from './login/createprofile/createprofile.component';
import { ProfileServices } from './administracion/roles-perm/users/profile.service';
import { ViewProfileComponent } from './main/view-profile/view-profile.component';
import { LoaderComponent } from './loader/loader.component';
import { PostsComponent } from './main/manage-posts/posts/posts.component';
import { MatchWithUserLoggedGuard } from './MatchUserLogged.service';
import { PostsService } from './main/manage-posts/posts/posts.service';
import { NoResourcesComponent } from './no-resources/no-resources.component';
import { CreateArticleComponent } from './main/manage-posts/posts/create-article/create-article.component';
import { ListPostsComponent } from './main/list-posts/list-posts.component';
import { PostsInicioComponent } from './main/manage-posts/posts/posts-inicio/posts-inicio.component';
import { InputElementComponent } from './ui/input-element/input-element.component';
import { ButtonElementComponent } from './ui/button-element/button-element.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    NotfoundComponent,
    FooterComponent,
    ModifyUserComponent,
    CreateacountComponent,
    CreateprofileComponent,
    ViewProfileComponent,
    LoaderComponent,
    PostsComponent,
    NoResourcesComponent,
    CreateArticleComponent,
    ListPostsComponent,
    PostsInicioComponent,
    InputElementComponent,
    ButtonElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AdministracionModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }),
    SweetAlert2Module.forRoot({
      provideSwal: ()=>import('sweetalert2').then(({ default: swal })=> swal.mixin({
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        animation: false,
      }))
    }),
    FormsModule
  ],
  providers: [
    DataCSRF,
    provideHttpClient(),
    provideAnimationsAsync(),
    LoginService,
    LoginGuard,
    MatchWithUserLoggedGuard,
    ProfileServices,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

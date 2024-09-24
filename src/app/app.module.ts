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
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { LoaderComponent } from './loader/loader.component';
import { PostsComponent } from './posts/posts.component';
import { MatchWithUserLoggedGuard } from './MatchUserLogged.service';
import { PostsService } from './posts/posts.service';
import { NoResourcesComponent } from './no-resources/no-resources.component';
import { CreateArticleComponent } from './create-article/create-article.component';

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

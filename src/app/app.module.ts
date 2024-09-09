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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    NotfoundComponent,
    FooterComponent,
    ModifyUserComponent,
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
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

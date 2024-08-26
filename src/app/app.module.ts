import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './main/footer/footer.component';
import { AsideMenuAdminComponent } from './administracion/aside-menu-admin/aside-menu-admin.component';
import { AdministracionModule } from './administracion/administracion.module';
import { HeaderAdminComponent } from './administracion/header-admin/header-admin.component';
import { CategoriasComponent } from './administracion/categorias/categorias.component';
import { InicioComponent } from './administracion/inicio/inicio.component';
import { RolesPermComponent } from './administracion/roles-perm/roles-perm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    NotfoundComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AdministracionModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

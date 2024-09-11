import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Profile } from '../../administracion/roles-perm/users/profile.model';
import { ProfileServices } from '../../administracion/roles-perm/users/profile.service';
import { ToastrService } from 'ngx-toastr';
import { InfoRequest } from '../../request_info.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrl: './createprofile.component.css'
})
export class CreateprofileComponent {
  constructor(private profileService: ProfileServices, private toastService: ToastrService, private router: Router, private loginService: LoginService){}

    //Propiedades para la creación de un perfil
    profile: Profile = new Profile();
    imagen_perfil: File | null = null; //Almacena una imagen de tipo File
    imagen_url: string | ArrayBuffer | null = null; //Almacena un array buffer o string con el valor de una url
    errors: [] = [];

    onSubmit(form: NgForm){
      if (form.valid) {
        this.createProfile();
        return true;
      }
      return false
    }

    onFileSelected(event: Event){
      const element = event.currentTarget as HTMLInputElement; //Convertir el evento a un elemento htmlinput para poder trabajar con el.
      let fileList:FileList | null = element.files; //Almacenamos los archivos en un objeto FileList
      if (fileList) {
        this.imagen_perfil = fileList[0]; //Al ser solo un archivo el que esperamos accedemos a la posición 0 y la asignamos
        const fileR = new FileReader(); //Instanciamos una clase de FileReader
        fileR.onload = () =>{ //Cuando se cargue una imagen que vamos a realizar?
          this.imagen_url = fileR.result; //Asignamos el resultado a la propiedad de imagen_url
        }
        fileR.readAsDataURL(fileList[0]); //Enviamos los datos a leer como una url
      }
    }

    validarDatos(): boolean{
      if (this.profile.name && this.profile.biography && this.profile.last_name != '' && this.imagen_perfil !=null) {
        return true;
      }
      return false;
    }

    createProfile(){
      if (this.imagen_perfil) {
        this.profileService.createProfile(this.profile, this.imagen_perfil).subscribe({
          next: (response: InfoRequest | Profile)=>{
            //Definir si la respuesta es un InfoRequest o un Profile
            if ('status' in response) {
                this.toastService.error(response.message);
            }else{
              this.loginService.setProfile(response); //Asignar nuevos datos del perfil hacia el usuario actual
              this.router.navigate(['']);
            }
          },
          error: (error: HttpErrorResponse)=>{
            switch (error.status) {
              case 422:
                
                break;
              case 403:
                this.toastService.error(`No se tiene el permiso para realizar la petición`);
                break;
              default:
                break;
            }
          }
        });
      }else{
        this.toastService.warning('No se puede proceder, selecciona una imagen de perfil');
      }
    }
}

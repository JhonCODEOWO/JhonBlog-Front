import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Profile } from '../../administracion/roles-perm/users/profile.model';
import { ProfileServices } from '../../administracion/roles-perm/users/profile.service';
import { ToastrService } from 'ngx-toastr';
import { InfoRequest } from '../../request_info.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../../administracion/roles-perm/users/user.model';
import { Utils } from '../../utils';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrl: './createprofile.component.css'
})
export class CreateprofileComponent implements OnInit{
  constructor(private profileService: ProfileServices, private toastService: ToastrService, private router: Router, private route: ActivatedRoute, private loginService: LoginService){}

    title: string = 'Crear perfil para la cuenta';
    //Propiedades para la creación de un perfil
    profile: Profile | null = null;
    imagen_perfil: File | null = null; //Almacena una imagen de tipo File
    imagen_url: string | ArrayBuffer | null = null; //Almacena un array buffer o string con el valor de una url
    errors: [] = [];
    editing: boolean = false;

    ngOnInit(): void {
        //Verificar si la URL tiene el parámetro de editando, si es así quiere decir que se está editando.
        const id:number | undefined = this.route.snapshot.params['id'];

        //Si el id está declarado quiere decir que estamos editando.
        if (id) {
          const actualUser: User | null = this.loginService.userLogged.getValue(); //Obtener la instancia actual del usuario logeado
          if (actualUser) { //Si el usuario es diferente de nulo entonces..
            this.title = 'Modificando perfil'
            this.profile = actualUser.profile; //Asigna a la propiedad profile los datos del perfil del usuario
            this.editing = true;
          }
        }else{ //Si no se está editando..
          this.profile = new Profile(); //Se crea una instancia vacía de profile pues es la que usaremos para el data binding de creación de nuevo perfil.
        }
    }

    onSubmit(form: NgForm){
      if (form.valid) {
        switch (this.editing) {
          case false: //Si no se está editando
            this.createProfile();
            break;
        
          case true:
            this.editProfile();
            break;
          default:
            break;
        }
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

    validarDatosOnCreate(): boolean{
      if (this.profile && this.profile.name && this.profile.biography && this.profile.last_name != '' && this.imagen_perfil !=null) {
        return true;
      }
      return false;
    }

    validarDatosOnEdit(): boolean{
      if (this.profile && this.profile.name && this.profile.biography && this.profile.last_name != '') {
        return true;
      }
      return false;
    }

    createProfile(){
      if (this.imagen_perfil && this.profile) {
        this.profileService.createProfile(this.profile, this.imagen_perfil).subscribe({
          next: (response: InfoRequest | Profile)=>{
            //Definir si la respuesta es un InfoRequest o un Profile
            if ('status' in response) {
                this.toastService.error(response.message);
            }else{
              this.loginService.setProfile(response); //Asignar nuevos datos del perfil hacia el usuario actual para el front
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

    editProfile(){
      if (this.profile) {
        this.profileService.modifyProfile(this.profile, this.imagen_perfil).subscribe({
          next: (response: InfoRequest | Profile)=>{
            if ('status' in response) {
              this.toastService.success(`Ha ocurrido un error mientras se realizaba la solicitud ${response.message}`);
            }else{
              /* Realizar todas las operaciones al saber que han cambiado los datos del perfil logeado */
              this.loginService.setProfile(response); //Actualizar los datos igual en el perfil actual del frontend
              this.router.navigate(['']); //Redireccionar hacia la pantalla de visualización de perfil nuevamente
            }
          },
          error: (error: HttpErrorResponse)=>{
            this.toastService.error(`Ha ocurrido un error al procesar la solicitud ${error.status}`);
          }
        })
      }
    }

    getResourceFromServer(path: string | null | undefined): string {
      if (path) {
        const urlServer = Utils.getUrlServer();
        return Utils.getUrlResourceFromServer(urlServer, path);
      }
      return '';
    }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrl: './createprofile.component.css'
})
export class CreateprofileComponent {

    //Propiedades para la creación de un perfil
    nameprofile!: string;
    apellidos!: string;
    imagen_perfil: File | null = null;
    imagen_url: string | ArrayBuffer | null = null;
    biografia!:string;

    onSubmit(form: NgForm){
      if (form.valid) {
        
        return true;
      }
      return false
    }

    onFileSelected(event: Event){
      const element = event.currentTarget as HTMLInputElement; //Convertir el evento a un elemento htmlinput para poder trabajar con el.
      let fileList:FileList | null = element.files; //Almacenamos los archivos en un objeto FileList
      if (fileList) {
        this.imagen_perfil = fileList[0]; //Al ser solo un archivo el que esperamos accedemos a la posición 0 y la asignamos
        const fileR = new FileReader();
        fileR.onload = () =>{
          this.imagen_url = fileR.result;
          console.log(fileR.result);
        }
        fileR.readAsDataURL(fileList[0]);
      }
    }
}

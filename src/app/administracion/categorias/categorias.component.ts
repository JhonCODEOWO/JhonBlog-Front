import { Component, OnInit, ViewChild } from '@angular/core';
import { general_data } from '../general_data.service';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../login/login.service';
import { User } from '../roles-perm/users/user.model';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { InfoRequest } from '../../request_info.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  constructor(private generalData: general_data, private categoriesService: CategoriesService, private toastService:ToastrService, private loginService: LoginService, public readonly swalTargets: SwalPortalTargets){}

  @ViewChild('modalAdd') public readonly modalAdd!:SwalComponent;

  tittle: string = 'Categorías';
  /**
   * Propiedad que almacena un arreglo de objetos category
   * @type {Category[] | null}
   */
  categories: Category[] | null = null;
  /**
   * Propiedad destinada a almacenar una instancia de category
   * @type {Category}
   */
  category: Category = new Category();

  setCategory(category: Category){
    let cloneCategory: Category = Object.assign(new Category(), category)//Clonar categoría con una nueva instancia para evitar bindearlo a la referencia de modificación.
    this.category = cloneCategory;
  }

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
    this.generalData.setTittle(this.tittle); //Coloca un titulo en el servicio general_data

    this.categoriesService.loadCategories(); //Realiza la petición de los datos de las categorías

    this.categoriesService.$categories.subscribe({
      next: (response: Category[] | null)=>{
        this.categories = response;
      },
      error: (error)=>{
        this.toastService.error('No se han podido obtener los cambios de los datos');
      }
    })
  }

  /**
   * Método para validar que un formulario tenga todos los datos required con un valor para proceder
   * @returns {boolean} `true` si se cumplen todas las restricciones `false` en el caso opuesto.
   */
  onSubmit(form: NgForm){
    if (form.valid) { //Valodar que el formulario sea válido.
      //Validar si los datos recibidos corresponden a un objeto sin un id y crear en caso de que sea nulo o editar en caso de lo contrario
      (this.category.id == null)? this.createCategory(): this.modifyCategory(this.category);
      return true;
    }

    this.toastService.warning('No se puede proceder si no has llenado los campos obligatorios');
    return false;
  }

  /**
   * Verfica si la propiedad `category` del componente en su id contiene un valor nulo, si es así vacía todos los datos pues en teoría se está añadiendo un nuevo dato.
   * @returns {boolean} `true` si se está editando `false` en el caso opuesto.
   */
  detectState() : boolean{
    if (this.category.id == null) {
      console.log('Se está creando un nuevo recurso');
      this.clearData();
      return true;
    }
    return false;
  }

  /**
   * Realiza la petición para el backend para la creación de una nueva categoría.
   */
  createCategory(){
    //Añadir el id del usuario que lo está creando.
    const user: User | null = this.loginService.getUser();

    //Validamos que si tengamos a un usuario.
    if (user) {
      this.category.user = user; //Añadimos el usuario actual a la categoría creada.

      //Realizamos la petición ahora sí.
      this.categoriesService.addCategory(this.category).subscribe({
        next: (response: InfoRequest)=>{
          if (response.status == 'ok') {
            this.categoriesService.loadCategories();
            this.modalAdd.close();
            this.clearData();
          }
          this.toastService.info(response.message);
        },
        error: (error: HttpErrorResponse)=>{
          this.toastService.error(`Ha ocurrido un error al realizar la solicitud: ${error.status}`);
        }
      });
    }
  }

  /**
   * Realiza la petición hacia el backend para modificar una categoría, si esta petición es exitosa se actualiza el recurso igual en el frontend.
   * @param {Category} category Instancia del objeto con los datos nuevos
   */
  modifyCategory(category: Category){
    
    this.categoriesService.modifyCategory(this.category).subscribe({
      next: (response: InfoRequest)=>{
        if (response.status == 'ok') {
          //Modificar el elemento en la colección.
          this.categoriesService.modifyElementFromCategories(category);
          //Cerrar el modal.
          this.modalAdd.close();
          //Limpiar los datos
          this.clearData();
        }
        this.toastService.info(response.message);
      },
      error: (error: HttpErrorResponse)=>{
        this.toastService.error(`Ha ocurrido un error al realizar la solicitud: ${error.status}`);
      }
    })
  }

  /**
   * Realiza la petición hacia el backend para eliminar una categoría, utilizando el id de la instancia del objeto.
   * @param {Category} category Instancia del objeto a eliminar debe tener un id definido.
   */
  deleteCategory(category: Category){

    this.categoriesService.deleteCategory(category).subscribe({
      next: (response: InfoRequest)=>{
        if (response.status === 'ok') {
          this.categoriesService.deleteElementFromCategories(category);
        }
        this.toastService.info(response.message);
      },
      error: (error: HttpErrorResponse)=>{
        this.toastService.error('Ha ocurrido un error al realizar la petición');
      }
    });
  }

  /**
   * Crea una nueva instancia vacía hacia la propiedad  `category` del componente y está destinada a limpiar más datos que sean necesarios
   */
  clearData(){
    this.category = new Category();
  }
}

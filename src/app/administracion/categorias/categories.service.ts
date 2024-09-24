import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Utils } from "../../utils";
import { BehaviorSubject, Observable } from "rxjs";
import { Category } from "./category.model";
import { InfoRequest } from "../../request_info.model";
import { DataCSRF } from "../../dataCSRF.service";

@Injectable()
export class CategoriesService{
    constructor(private httpClient: HttpClient, private toastService:ToastrService, private csrf: DataCSRF){}

    private url = `${Utils.api_url}/category`;
    /**
   * Categorias actuales almacenadas.
   * @type {BehaviorSubject<Category[] | null>}
   * @private
   */
    private categories = new BehaviorSubject<Category[]|null>(null);
    /**
   * Propiedad para suscribir componentes a los cambios de la propiedad categories almacenadas en el servicio
   * @type {Observable}
   * @public
   */
    public $categories = this.categories.asObservable();

    /**
   * Carga las a categories los datos obtenidos desde el backend
   * @public
   */
    public loadCategories(){
        this.httpClient.get<Category[]|null>(`${this.url}/index`).subscribe({
            next: (result: Category[]|null)=>{
                if (result != null) {
                    this.categories.next(result);
                }else{
                    this.toastService.error('No se han encontrado categorías');
                }
            },
            error: (error: HttpErrorResponse)=>{
                this.toastService.error(`Ha ocurrido un error al realizar la solicitud: ${error.status}`);
            }
        });
    }

    /**
   * Añade un nuevo elemento a categories
   * @param {Category} category  Objeto a añadir
   * @public
   */
    public setCategorie(category: Category){
        const actualCategories: Category[] | null = this.categories.getValue();
        if (actualCategories) {
            actualCategories.push(category);
            this.categories.next(actualCategories);
        }
    }

    /**
   * Genera una petición para añadir una nueva categoría.
   * @param {Category} category  Objeto a añadir
   * @public
   */
    public addCategory(category: Category): Observable<InfoRequest>{

        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };

        const formData = new FormData();
        formData.append('name', category.name??'');
        formData.append('description', category.description??'');
        formData.append('user_id', category.user?.id.toString()??'');

        return this.httpClient.post<InfoRequest>(`${this.url}/create`, formData, {headers});
    }

    /**
   * Genera una petición para modificar una categoría.
   * @param {Category} category  Objeto a añadir
   * @public
   */
    public modifyCategory(category: Category): Observable<InfoRequest>{
        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual
        }

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', category.name??'');
        formData.append('description', category.description??'');

        return this.httpClient.post<InfoRequest>(`${this.url}/${category.id}/update`, formData, {headers});
    }

    /**
   * Realiza una petición al backend para eliminar una categoría.
   * @param {Category} category Dato a eliminar
   * @public
   */
    public deleteCategory(category: Category): Observable<InfoRequest>{

        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual
        }

        return this.httpClient.delete<InfoRequest>(`${this.url}/delete/${category.id}`, {headers});
    }

    /**
   * Actualiza los datos de una categoría dentro de `categories` basada en su id.
   * @param {Category} category  objeto a reemplazar en la colección actual de categories.
   * @public
   */
    public modifyElementFromCategories(category: Category){
        Utils.modifyElementFromBehavior(this.categories, category);
    }

    /**
   * Elimina una instancia dentro de la colección `categories` basado en el objeto recibido y su id.
   * @param {Category} category  objeto a eliminar de la colección actual.
   * @public
   */
    public deleteElementFromCategories(category: Category){
        Utils.deleteElementFromBehavior(this.categories, category);
    }
}
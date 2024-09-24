import { BehaviorSubject } from 'rxjs';
import { Permission } from './administracion/permission.model';

export class Utils {

    static api_url:string = 'http://localhost:8088/api'; // Url general del servidor de backend api
    static url_backend:string = 'http://localhost:8088'; // Url general del servidor de backend
    
    /**
     * Verifica si un permiso está presente en el arreglo de permisos.
     * 
     * @param permissionName - El nombre del permiso a buscar.
     * @param permissions - El arreglo de objetos Permission a usar para la búsqueda
     * @returns `true` si el permiso existe, de lo contrario `false`.
     */
    static findPermission(permissionName: string, permissions: Permission[] | null): boolean {
        if (permissions != null) {
            return permissions.some((p) => p.name == permissionName);
        } else {
            return false;
        }
    }
    

    static getUrlServer(): string{
        const serverurl = Utils.url_backend;
        return serverurl;
    }

    /**
     * Obtiene la url de acceso a un recurso en el backend
     * 
     * @param urlServer - Debe ser el dominio del servidor.
     * @param pathResource - Debe ser la ruta de acceso a un recurso
     * @returns La url de acceso a un recurso en el servidor.
     */
    static getUrlResourceFromServer(urlServer: string, pathResource: string):string{
        const urlResource = `${urlServer}/${pathResource}`;
        return urlResource;
    }

    static addElementToBehavior(collection: BehaviorSubject<any | null>, elementEdited: any){

    }

    /**
     * Modifica los valores de un objeto en una colección en base al objeto recibido.
     * 
     * @param {BehaviorSubject<any | null>}collection  - colección que contiene los objetos para utilizar.
     * @param {any} elementEdited - Instancia de un objeto que debe ser de la misma instancia de la colección y debe tener una propiedad ID.
     * @returns `true` si se ha podido realizar la operación `false` en el caso contrario
     * @note Aún está pendiente la mejora de este método para mantener un tipado más estricto.
     */
    static modifyElementFromBehavior(collection: BehaviorSubject<any[] | null>, elementEdited: any | null){
        const data: any[] | null  = collection.getValue();

        if (data && elementEdited) {
            let indexFinded = data.findIndex((dataElement)=>dataElement.id === elementEdited.id);

            if (indexFinded != -1) {
                elementEdited.updated_at = new Date();
                data[indexFinded] = elementEdited;
                collection.next(data);
                return true;
            }
        }

        return false;
    }

    /**
     * Elimina un objeto de una colección en base a su id.
     * 
     * @param {BehaviorSubject<any | null>}collection  - colección que contiene los objetos para utilizar.
     * @param {any | null} element - Instancia de un objeto que debe ser de la misma instancia de la colección y debe tener una propiedad ID.
     * @returns `true` si se ha podido realizar la operación `false` en el caso contrario
     * @note Aún está pendiente la mejora de este método para mantener un tipado más estricto.
     */
    static deleteElementFromBehavior(collection: BehaviorSubject<any[] | null>, element: any | null): boolean{
        const data: any[] | null = collection.getValue();
        if (data && element) {
            const index = data.findIndex((elementData)=>elementData.id == element.id);

            if (index != -1) {
                data.splice(index, 1);
                collection.next(data);
                return true;
            }
        }
        return false;
    }
}

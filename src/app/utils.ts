import { Permission } from './administracion/permission.model';

export class Utils {

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
}

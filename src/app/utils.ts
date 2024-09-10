import { Permission } from './administracion/permission.model';

export class Utils {
    static findPermission(permissionName: string, permissions: Permission[] | null): boolean {
        if (permissions != null) {
            return permissions.some((p) => p.name == permissionName);
        } else {
            return false;
        }
    }
}

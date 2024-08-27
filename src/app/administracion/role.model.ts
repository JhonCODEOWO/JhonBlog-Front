import { Permission } from "./permission.model";

export class Role{
    id: number = -1;
    name: string = '';
    description: string = '';
    created_at: string = '';
    updated_at: string = '';
    permissions: Permission[] = [];

    constructor(id:number, name:string, permissions:Permission[]){
        this.id = id;
        this.name = name;
        this.permissions= permissions;
    }
}
import { Role } from "./role.model";

export class Permission{
    id: number = -1;
    name: string = '';
    description: string = '';
    created_at: string = '';
    updated_at: string = '';
    roles: Role[] = [];

    constructor(id:number, name:string, roles:Role[]){
        this.id = id;
        this.name = name;
        this.roles= roles;
    }
}
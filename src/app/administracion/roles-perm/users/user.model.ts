import { Role } from "../../role.model";

export class User{
    id:number = -1;
    name:string = 'Sin nombre guardado';
    email:string  = '';
    email_verified_at:Date|string = '';
    password:string  = '';
    remember_token:string = '';
    created_at:Date|string = '';
    updated_at:Date|string = '';
    roles:Role[] = [];
    // profiles:Role[] = [];
}
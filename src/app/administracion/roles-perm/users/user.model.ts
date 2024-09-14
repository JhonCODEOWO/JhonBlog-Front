import { Role } from "../../role.model";
import { Profile } from "./profile.model";

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
    profile:Profile | null = null;

    constructor(id: number, name:string, email:string, email_verified_at: Date|string = '', password:string, remember_token: string = '', created_at: Date, updated_at:Date, roles: Role[]  = [], profile: Profile | null = null){
        this.id = id;
        this.name = name;
        this.email = email;
        this.email_verified_at = email_verified_at;
        this.password = password;
        this.password = password;
        this.remember_token = remember_token;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.roles = roles;
        this.profile = profile;
    }
}
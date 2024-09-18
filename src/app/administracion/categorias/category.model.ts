import { User } from "../roles-perm/users/user.model";

export class Category{
    id: number | null = null;
    name: string | null = '';
    user: User | null = null;
    created_at: Date | null = null;
    updated_at: Date | null = null;

    constructor(id:number | null = null, name:string = '', user:User | null = null, created_at:Date | null = null, updated_at: Date | null = null){
        this.id = id;
        this.name = name;
        this.user = user;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
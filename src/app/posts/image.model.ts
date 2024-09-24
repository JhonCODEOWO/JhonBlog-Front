import { User } from "../administracion/roles-perm/users/user.model";

export class Image{
    id: number | null = null;
    url: string | null = null;
    user: User | null = null;
    created_at: Date | null = null;
    updated_at: Date | null = null;

    constructor(id: number | null = null, url: string | null = null, user: User | null = null, created_at: Date | null = null, updated_at: Date | null = null){
        this.id = id;
        this.url = url;
        this.user = user;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
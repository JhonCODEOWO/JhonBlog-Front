import { User } from "./user.model";


export class Profile{
    id:number | null;
    name: string | null;
    last_name: string | null;
    profile_photo: string | null;
    biography:string | null;
    user: User | null = null;
    created_at: Date | string | null;
    updated_at: Date | string | null;

    constructor(id: number | null = null, name:string | null = null, last_name:string | null = null, profile_photo:string | null = null, biography: string | null = null, created_at: Date | string | null = null, updated_at: Date|string | null = null, user:User | null = null){
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.profile_photo = profile_photo;
        this.biography = biography;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user = user;
    }
}
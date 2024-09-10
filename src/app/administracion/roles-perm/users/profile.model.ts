import { User } from "./user.model";


export class Profile{
    id:number = -1;
    name: string = 'Sin nombre';
    last_name: string = 'Sin apellidos';
    profile_photo: string = 'Sin foto';
    biography:string = 'Sin biografía';
    user: User | null = null;
    created_at: Date | string = '';
    updatet_at: Date | string = '';
}
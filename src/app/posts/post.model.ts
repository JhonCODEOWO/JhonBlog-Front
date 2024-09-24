import { Category } from "../administracion/categorias/category.model";
import { User } from "../administracion/roles-perm/users/user.model";
import { Image } from "./image.model";

export class Article{
    id: number | null = null;
    tittle: string | null = null;
    content: string | null = null;
    creator_notes: string | null = null;
    views: number | null = null;
    likes: number | null = null;
    user: User | null = null;
    categories: Category[] | null = null;
    images: Image[] | null = null;
    created_at: Date | null = null;
    updated_at: Date | null = null;

    constructor(id:number | null = null,tittle: string | null = null, content:string | null = null,creator_notes: string | null = null, views:number | null = null, likes:number | null = null, user: User | null = null, categories: Category[] | null = null, images: Image[] | null = null,created_at: Date | null = null, updated_at: Date | null = null){
        this.id = id;
        this.tittle = tittle;
        this.content = content;
        this.creator_notes = creator_notes;
        this.views = views;
        this.likes = likes;
        this.user = user;
        this.categories = categories;
        this.images = images;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
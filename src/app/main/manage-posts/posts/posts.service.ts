import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Article } from "./post.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Utils } from "../../../utils";
import { ToastrService } from "ngx-toastr";
import { InfoRequest } from "../../../request_info.model";
import { User } from "../../../administracion/roles-perm/users/user.model";
import { DataCSRF } from "../../../dataCSRF.service";
import { LoginService } from "../../../login/login.service";

@Injectable()
export class PostsService{
    constructor(private httpClient: HttpClient, private toastService: ToastrService, private csrf: DataCSRF, private loginService: LoginService){}

    private posts = new BehaviorSubject<Article[] | null>(null);
    public $posts = this.posts.asObservable();

    private postsUser = new BehaviorSubject<Article[] | null>(null);
    public $postsUser = this.postsUser.asObservable();

    private url = `${Utils.api_url}/post`;

    loadPosts(){
        this.httpClient.get<Article[] | null>(`${this.url}/all`).subscribe({
            next: (posts: Article[] | null)=>{
                this.posts.next(posts);
            },
            error: (error: HttpErrorResponse)=>{
                this.toastService.error('No se han podido obtener los posts ' + error.status);
            }
        });
    }

    loadPostOfUser(){
        const userActual: User | null = this.loginService.getUser();
        if (userActual) {
            this.httpClient.get<Article[] | null>(`${this.url}/${userActual.id}/all`).subscribe({
                next: (posts: Article[] | null)=>{
                    this.postsUser.next(posts);
                },
                error: (error: HttpErrorResponse)=>{
                    this.toastService.error('No se han podido obtener los posts de este usuario: ' + error.status);
                }
            });
        }
    }

    addArticle(article: Article): Observable<InfoRequest>{
        const formData = new FormData;

        formData.append('tittle', article.tittle??'');
        formData.append('content', article.content??'');
        formData.append('creator_notes', article.creator_notes??'');
        formData.append('user_id', article.user?.id.toString()??'');

        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };

        return this.httpClient.post<InfoRequest>(`${this.url}/create`, formData, {headers});
    }

    deleteArticle(article: Article): Observable<InfoRequest>{
        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };
        return this.httpClient.delete<InfoRequest>(`${this.url}/delete/${article.id}`, {headers});
    }

    modifyArticle(article: Article): Observable<InfoRequest>{
        const formData = new FormData;


        formData.append('_method', 'PUT');
        formData.append('tittle', article.tittle??'');
        formData.append('content', article.content??'');
        formData.append('creator_notes', article.creator_notes??'');

        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };

        return this.httpClient.post<InfoRequest>(`${this.url}/modify/${article.id}`, formData, {headers});
    }

    modifyArticleInCollection(article: Article){
        Utils.modifyElementFromBehavior(this.postsUser, article);
    }

    deleteArticleInCollection(article: Article){
        Utils.deleteElementFromBehavior(this.postsUser, article);
    }

    clearAllData(){
        this.posts.next(null);
    }

    clearAllDataOnUsers(){
        this.postsUser.next(null);
    }
}
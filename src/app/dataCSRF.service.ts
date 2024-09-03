import { HttpClient } from "@angular/common/http";
import { Csrf } from "./csrf.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class DataCSRF{
    public tokenActual:string = '';
    private xsrfUrl = 'http://localhost:8088/sanctum/csrf-cookie';
    private csrfUrl = `http://localhost:8088/api/getCSRF`;
    constructor(private http:HttpClient){}

    getXsrfToken(): Observable<any> {
        return this.http.get(`${this.xsrfUrl}`);
    }

    getCsrfToken(){
        this.http.get<Csrf>(`${this.csrfUrl}`).subscribe({
            next: (data: Csrf)=>{
                this.tokenActual = data.token;
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    getCookie(name: string): string {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            return match[2];
        }
        return '';
    }
}
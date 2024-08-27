import { HttpClient } from "@angular/common/http";
import { Csrf } from "./csrf.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class DataCSRF{
    tokenActual:string = '';
    private csrfUrl = 'http://localhost:8088/sanctum/csrf-cookie';
    constructor(private http:HttpClient){}

    getCsrfToken(): Observable<any> {
        return this.http.get(`${this.csrfUrl}`, {withCredentials: true});
    }

    getCookie(name: string): string {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            return match[2];
        }
        return '';
    }
}
import { HttpClient } from "@angular/common/http";
import { Csrf } from "./csrf.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class DataCSRF{
    tokenActual:string = '';
    url: string = 'http://localhost:8088/getCSRF';
    constructor(private http:HttpClient){}

    //Retorno de observable para ser consumido por otro componente
    getCsrf(): Observable<Csrf>{
        return this.http.get<Csrf>(this.url);
    }
}
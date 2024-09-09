import { HttpClient } from "@angular/common/http";
import { Csrf } from "./csrf.model";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class DataCSRF{
    tokenActual: string = ''; //Propiedad encargada de almacenar el token csrf actual
    private xsrfUrl = 'http://localhost:8088/sanctum/csrf-cookie'; //Ruta para obtener un xsrf token el cual incrusta una cookie, es necesario tener en laravel sanctum, es ideal para proyectos de angular que están hosteados en distintos dominios a laravel
    private csrfUrl = `http://localhost:8088/api/getCSRF`; //Petición de csrf para laravel, debes de hostear el proyecto de Angular desde el servidor de Laravel para que funcionen estos tokens es decir, es para peticiones desde el mismo dominio.
    constructor(private http:HttpClient){}


    getXsrfToken(): Observable<any> {
        return this.http.get(`${this.xsrfUrl}`);
    }

    getCsrfToken(){
        this.http.get<Csrf>(`${this.csrfUrl}`).subscribe({
            next: (data: Csrf)=>{
                this.tokenActual = data.token; //Asigna la respuesta a la propiedad del servicio
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    //Usalo solo cuando generes peticiones desde otros servicios usando xsrf, toma la cookie del encabezado X-XSRF-TOKEN y puedes asignarla a tus cabeceras.
    getCookie(name: string): string {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            return match[2];
        }
        return '';
    }
}
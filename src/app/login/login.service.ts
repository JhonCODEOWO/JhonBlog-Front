import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { User } from "../administracion/roles-perm/users/user.model";
import { InfoRequest } from "../request_info.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { DataCSRF } from "../dataCSRF.service";

@Injectable()
export class LoginService{
    constructor(private toastService: ToastrService, private csrfService: DataCSRF,private httpClient: HttpClient){}

    //Objeto usado para poder almacenar los datos de un usuario que si ha podido logearse
    userLogged = new BehaviorSubject<User|null>(null);
    userLogged$ = this.userLogged.asObservable();

    url: string = "http://localhost:8088/api/user"; //Url para realizar las peticiones de login y logout

    //Petición al backend para intentar realizar el login
    login(email: string, password: string):Observable<User|InfoRequest>{
        //Prepare the header to be placed in the request
        let headers = {
            'X-CSRF-TOKEN': this.csrfService.tokenActual,
        };
        
        //Prepare the data to be sended
        let peticion = {
            email: email,
            password: password
        };

        return this.httpClient.post<User|InfoRequest>(`${this.url}/login`, peticion, {headers});
    }

    logout(): Observable<InfoRequest>{
        //Prepare the header to be placed in the request
        let headers = {
            'X-CSRF-TOKEN': this.csrfService.tokenActual,
        };
        return this.httpClient.delete<InfoRequest>(`${this.url}/logout`, {headers});
    }

    //Método para colocar el objeto usuario en nuestro behavior subject
    setUser(user: User | null){
        this.userLogged.next(user);
    }
}
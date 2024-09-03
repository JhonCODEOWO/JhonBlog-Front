import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InfoRequest } from "../../../request_info.model";
import { DataCSRF } from "../../../dataCSRF.service";

@Injectable()
export class UserServices{
    constructor(private httpClient: HttpClient, private csrfService: DataCSRF){}

    private users = new BehaviorSubject<User[]>([]);
    users$ = this.users.asObservable();

    private url =  `http://localhost:8088/api`;

    getUsers(){
        this.httpClient.get<User[]>(`${this.url}/users`).subscribe({
            next: (users)=>{
                this.users.next(users);
            },
            error: (error)=>{
                console.error(error);
            }
        });
    }

    addUser(name:string, email:string, password:string): Observable<InfoRequest>{
        const body = {
            name: name,
            email: email,
            password: password
        };
        const headers = {
            'X-CSRF-TOKEN': this.csrfService.tokenActual
        };

        return this.httpClient.post<InfoRequest>(`${this.url}/user/create`, body, {headers});
    }

    deleteUser(user: User): Observable<InfoRequest>{
        
        const headers = {
            'X-CSRF-TOKEN': this.csrfService.tokenActual
        };

        return this.httpClient.delete<InfoRequest>(`${this.url}/user/delete/${user.id}`, {headers});
    }
}
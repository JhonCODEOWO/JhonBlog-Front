import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { InfoRequest } from "../../../request_info.model";
import { DataCSRF } from "../../../dataCSRF.service";
import { Role } from "../../role.model";
import { ToastrService } from "ngx-toastr";
import { Utils } from "../../../utils";

@Injectable()
export class UserServices{
    constructor(private httpClient: HttpClient, private csrfService: DataCSRF, private toastService: ToastrService){}

    private users = new BehaviorSubject<User[]>([]);
    users$ = this.users.asObservable();

    private selectedUser = new BehaviorSubject<User | undefined>(undefined);
    selectedUser$ = this.selectedUser.asObservable();

    private url =  `${Utils.api_url}`;

    setSelectedUser(user: User){
        return this.selectedUser.next(user);
    }

    getUsers(){
        this.httpClient.get<User[]>(`${this.url}/users`).subscribe({
            next: (users)=>{
                this.users.next(users);
            },
            error: (error: HttpErrorResponse)=>{
                this.toastService.error('No se han podido obtener los datos de los usuarios. Código de error: ' + error.status);
                console.error(error);
            }
        });
    }

    getUser(id: number): Observable<User>{
        return this.httpClient.get<User>(`${this.url}/user/${id}`);
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

    addRoleToUser(role: Role, user: User):Observable<InfoRequest>{
        
        const body = {
            role: role.id
        };

        const headers = {
            'X-CSRF-TOKEN': this.csrfService.tokenActual
        };

        return this.httpClient.post<InfoRequest>(`${this.url}/user/${user.id}/addRole`,body, {headers});
    }

    deleteRoleFromUser(user: User, role: Role): Observable<InfoRequest>{
        const headers = {
            'X-CSRF-TOKEN': this.csrfService.tokenActual
        };

        return this.httpClient.delete<InfoRequest>(`${this.url}/user/deleteRole/${user.id}/${role.id}`, {headers});
    }
}
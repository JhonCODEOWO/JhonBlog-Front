import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Permission } from "./permission.model";
import { Role } from "./role.model";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DataCSRF } from "../dataCSRF.service";
import { InfoRequest } from "../request_info.model";

@Injectable()
export class RolePermissionsService{
    constructor(private http:HttpClient, private csrf: DataCSRF){}
    
    private permissions = new BehaviorSubject<Permission[]>([]);
    permissions$ = this.permissions.asObservable();

    private roles = new BehaviorSubject<Role[]>([]);
    roles$ = this.roles.asObservable();

    private url = 'http://localhost:8088/api';

    //Peticion get para obtener todos los registros de roles
    getRoles(){
        this.http.get<Role[]>(this.url + '/roles').subscribe(
            {
                next: (data: Role[])=>{
                    this.roles.next(data);
                },
                error: (error)=>{
                    console.log(error);
                }
            }
        );
    }

    //Petición get para obtener todos los registros de los permisos
    getPermissions(){
        this.http.get<Permission[]>(this.url + '/permissions').subscribe(
            {
                next: (data: Permission[])=>{
                    this.permissions.next(data);
                },
                error: (error)=>{
                    console.log(error);
                }
            }
        )
    }

    //Petición put para actualizar un registro que necesita ser consumido por un componente. Retorna un objeto InfoRequest perteneciente al modelo request_info.ts
    updateRole(role:Role): Observable<InfoRequest>{
        //Get the token placed in the cookie
        let token = this.csrf.getCookie('XSRF-TOKEN');
        let infoRequest: InfoRequest | undefined = undefined;

        //Prepare the header to be placed in the request
        let headers = {
            'X-XSRF-TOKEN': token,
        };
        
        //Prepare the data to be sended
        let peticion = {
            name: role.name,
            description: role.description
        };

        //Execute the request
        return this.http.put<InfoRequest>(`${this.url}/edit/role/${role.id}`, peticion, {headers, withCredentials: true});
    }

    deleteRole(role:Role): Observable<InfoRequest>{
        return this.http.delete<InfoRequest>(`${this.url}/delete/role/${role.id}`, {withCredentials: true});
    }
}
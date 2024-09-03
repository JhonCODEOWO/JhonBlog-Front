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

    private roles = new BehaviorSubject<Role[]>([]);
    roles$ = this.roles.asObservable();

    private url =  `http://localhost:8088/api`;

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
    getPermissions(role: Role): Observable<Permission[]>{
        return this.http.get<Permission[]>(this.url + `/permissions/${role.id}`);
    }

    //Petición post para añadir un registro de un role
    addRole(name:string, description:string): Observable<InfoRequest>{
        //Prepare the header to be placed in the request
        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };
        
        //Prepare the data to be sended
        let peticion = {
            name: name,
            description: description
        };

        return this.http.post<InfoRequest>(`${this.url}/role/create`, peticion, {headers});
    }
    //Petición put para actualizar un registro que necesita ser consumido por un componente. Retorna un objeto InfoRequest perteneciente al modelo request_info.ts
    updateRole(role:Role): Observable<InfoRequest>{

        //Prepare the header to be placed in the request
        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };
        
        //Prepare the data to be sended
        let peticion = {
            name: role.name,
            description: role.description
        };

        //Execute the request
        return this.http.put<InfoRequest>(`${this.url}/edit/role/${role.id}`, peticion, {headers});
    }

    deleteRole(role:Role): Observable<InfoRequest>{
        return this.http.delete<InfoRequest>(`${this.url}/delete/role/${role.id}`);
    }

    assignPermissionToRole(permission: Permission, role: Role): Observable<InfoRequest>{

        //Prepare the header to be placed in the request
        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };
        
        //Prepare the data to be sended
        let peticion = {
            role: role.id
        };

        return this.http.post<InfoRequest>(`${this.url}/assignpermission/${permission.id}`, peticion, {headers});
    }

    quitPermission(permission: Permission, role: Role): Observable<InfoRequest>{
        //Prepare the header to be placed in the request
        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };

        return this.http.delete<InfoRequest>(`${this.url}/quitpermission/${permission.id}/${role.id}`, {headers});
    }
}
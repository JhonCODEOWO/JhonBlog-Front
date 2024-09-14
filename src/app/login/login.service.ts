import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { User } from "../administracion/roles-perm/users/user.model";
import { InfoRequest } from "../request_info.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { DataCSRF } from "../dataCSRF.service";
import { Permission } from "../administracion/permission.model";
import { Role } from "../administracion/role.model";
import { Profile } from "../administracion/roles-perm/users/profile.model";

@Injectable()
export class LoginService{
    constructor(private toastService: ToastrService, private csrfService: DataCSRF,private httpClient: HttpClient){}

    //Objeto usado para poder almacenar los datos de un usuario que si ha podido logearse
    userLogged = new BehaviorSubject<User|null>(null);
    userLogged$ = this.userLogged.asObservable();

    userPermissions = new BehaviorSubject<Permission[]|null>(null);
    userPermissions$ = this.userPermissions.asObservable();

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

    /**
 * Verifica si un usuario está autenticado
 * 
 * @returns `true` si el userLogged es diferente de null y `false` si ese valor esta vacío dando a entender que no hay nadie logeado.
 */
    isAutenticated(): boolean{
        return (this.userLogged.getValue()==null)?false:true;
    }

    /**
     * Verifica si el usuario enviado como parámetro es el mismo que el que esta logeado.
     * 
     * user - Usuario deseado a comparar con el usuarioLogeado.
     * 
     * @returns `true` si el userLogged es diferente de null y `false` si ese valor esta vacío dando a entender que no hay nadie logeado.
     */
    matchWithUserLogged(user: User): boolean{
        if (this.userLogged.getValue()!= null) {
            return this.userLogged.getValue()?.id === user.id;
        }
        return false;
    }

    //Método para colocar el objeto usuario en nuestro behavior subject
    setUser(user: User | null){
        this.userLogged.next(user);
    }

    //Recorre los roles y asigna cada permiso existente en el hacia userPermissions
    setPermissions(user: User){
        console.log(user);
        let permissionsObtained: Permission[] = [];
        user.roles.forEach((role: Role)=>{
            role.permissions.forEach((permission: Permission)=>{
                //No colocar dos veces el mismo objeto para evitar dupliados usando el método some: recibe un callback en donde la primera variable representa un objeto contenido en el arreglo, y su comparativa un objeto que va a ingresar.
                if (!permissionsObtained.some( p => p.id == permission.id)) {
                    permissionsObtained.push(permission); //Añade el permiso a permissionsObtained
                }
            })
        })
        //Eliminar duplicados
        this.userPermissions.next(permissionsObtained);
        console.log(permissionsObtained);
    }

    setProfile(profile: Profile){
        const actualUser: User | null = this.userLogged.getValue();

        //Asignar el perfil al usuario
        if(actualUser){
            actualUser.profile = profile; //Asignar el objeto profile
            this.userLogged.next(actualUser); //Actualizar los cambios en el behaviorsubject
            console.log(this.userLogged.getValue());
        }else{
            this.toastService.error('No se ha podido asignar correctamente el perfil al usuario');
        }
    }
}
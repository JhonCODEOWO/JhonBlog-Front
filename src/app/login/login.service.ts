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
import { Utils } from "../utils";

@Injectable()
export class LoginService{
    constructor(private toastService: ToastrService, private csrfService: DataCSRF,private httpClient: HttpClient){}

    //Objeto usado para poder almacenar los datos de un usuario que si ha podido logearse
    userLogged = new BehaviorSubject<User|null>(this.getPermanentSession());
    userLogged$ = this.userLogged.asObservable();

    userPermissions = new BehaviorSubject<Permission[]|null>(null);
    userPermissions$ = this.userPermissions.asObservable();

    private url: string = `${Utils.api_url}/user`; //Url para realizar las peticiones de login y logout

    /**
     * Realiza la instancia de una petición para el servidor que realiza el login de un usuario
     * 
     * @param email-  Correo del usuario.
     * @param password - Contraseña del usuario
     * @returns Obserbvable<User|InfoRequest> - Si el logeo es exitoso se recibe la instancia del usuario para poder usarla en userLogged en caso contrarion se recibe un InfoRequest con el mensaje del error.
     */
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


    /**
     * Realiza una petición al backend para destruir una sesión de un usuario logeado.
     * 
     * @returns Obserbvable<InfoRequest> - Se devuelve una instancia InfoRequest que puede contener un status, en base a si la solicitud se completó exitosamente.
     */
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

        /**
 * Asigna una instancia de User hacia userLogged.
 * 
 * @param user -  Usuario que se desea asignar.
 */
    setUser(user: User | null){
        this.userLogged.next(user);
    }

    /**
   * Obtiene la instancia del usuario logeado actualmente
   * @return {User} instancia de la clase User actual en userLogged.
   * @public
   */
    public getUser(): User | null{
        return this.userLogged.getValue();
    }

    /**
 * Recorre los roles de un user y los permissions se transfieren hacia userPermissions.
 * 
 * @param user -  Instancia de una clase User que debe tener cargados valores en permissions.
 */
    setPermissions(user: User){
        let permissionsObtained: Permission[] = [];
        user.roles.forEach((role: Role)=>{
            role.permissions.forEach((permission: Permission)=>{
                //No colocar dos veces el mismo objeto para evitar dupliados usando el método some: recibe un callback en donde la primera variable representa un objeto contenido en el arreglo, y su comparativa un objeto que va a ingresar.
                if (!permissionsObtained.some( permissionExist => permissionExist.id == permission.id)) {
                    permissionsObtained.push(permission); //Añade el permiso a permissionsObtained
                }
            })
        })
        this.userPermissions.next(permissionsObtained); // Asignar valores hacia userPermissions
    }

    /**
     * Coloca una nueva instancia de profile dentro de userLogged
     * 
     * @param profile -  Nueva instancia de profile a asignar.
     */
    setProfile(profile: Profile){
        const actualUser: User | null = this.userLogged.getValue(); //Obtiene el valor actual del usuario logeado

        //Si actualUser es diferente de null
        if(actualUser){
            actualUser.profile = profile; //Asignar el objeto profile
            this.userLogged.next(actualUser); //Actualizar los cambios en el behaviorsubject para sincrinizarlos
        }else{
            this.toastService.error('No se ha podido asignar correctamente el perfil al usuario');
        }
    }

    getPermanentSession(): User | null{
        const user = localStorage.getItem('user'); //Toma el valor de localstorage
        return user ? JSON.parse(user): null; //lo retorna usando el json
    }

    setPermanentSession(user: User){
        localStorage.setItem('user', JSON.stringify(user));
    }

    clearSession(){
        localStorage.removeItem('user');
        this.userLogged.next(null);
        this.userPermissions.next(null);
    }
}
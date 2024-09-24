//Usado para permitir el acceso a una determinada ruta solo si coincide el id del usuario con el usuario logeado.

import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login/login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class MatchWithUserLoggedGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const id: number = Number(route.params['id']); //Obtenemos el id de la url
        if (this.loginService.matchWithUserLogged(id)) { //Si el id coincide con el usuario logeado permitimos el acceso
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
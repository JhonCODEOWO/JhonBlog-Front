import { HttpClient } from "@angular/common/http";
import { Profile } from "./profile.model";
import { Injectable } from "@angular/core";
import { DataCSRF } from "../../../dataCSRF.service";
import { LoginService } from "../../../login/login.service";
import { Observable } from "rxjs";
import { InfoRequest } from "../../../request_info.model";

@Injectable()
export class ProfileServices{
    constructor(private httpClient:HttpClient, private csrf: DataCSRF, private loginService: LoginService){}

    
    url: string = `http://localhost:8088/api/profile`;

    createProfile(profile: Profile,  profile_photo: File):Observable<InfoRequest>{
        const formData = new FormData();
        let userId: number | undefined = this.loginService.userLogged.getValue()?.id;

        //Si profile_photo y profile están declarados.
        if (profile_photo && userId) {
            formData.append('name', profile.name??'');
            formData.append('last_name', profile.last_name??'');
            formData.append('biography', profile.biography??'');
            formData.append('profile_photo', profile_photo??'');
            formData.append('user_id', userId.toString());
        }

        let headers = {
            'X-CSRF-TOKEN': this.csrf.tokenActual,
        };

        return this.httpClient.post<InfoRequest>(`${this.url}/create`, formData, {headers});
    }


}
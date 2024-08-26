import { EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export class general_data{
    private tittleSource = new BehaviorSubject<string>('Sin titulo');
    tittle$ = this.tittleSource.asObservable();

    //Da un titulo emitido como un evento
    setTittle(tittle:string){
        this.tittleSource.next(tittle);
    }
}
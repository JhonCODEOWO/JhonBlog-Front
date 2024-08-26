export class Csrf{
    token: string = '';
    constructor(token: string){
        this.token = token;
    }
}
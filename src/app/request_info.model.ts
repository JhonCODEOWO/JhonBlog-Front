export class InfoRequest{
    public status: string = '';
    public message: string = '';

    constructor(status:string, message:string){
        this.status = status;
        this.message = message;
    }
}
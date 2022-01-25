export class CustomResponse{
    public readonly codeStatus: number;
    public readonly message: string;
    public readonly result: any;

    constructor({codeStatus, message, result} : {codeStatus: number, message: string, result: any}){
        this.codeStatus = codeStatus;
        this.message = message;
        this.result = result;
    }
}
export class CustomResponse{
    public readonly codeStatus: number;
    public readonly message: string;
    public readonly code: string;
    public readonly result: any;

    constructor({codeStatus, message, result, code} : {codeStatus: number, message: string, result: any, code: string}){
        this.codeStatus = codeStatus;
        this.message = message;
        this.result = result;
        this.code = code;
    }
}
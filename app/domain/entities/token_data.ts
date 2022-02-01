export class TokenData{
    readonly id: string;
    readonly permission: string;

    constructor({id, permission}: {id: string, permission: string}){
        this.id = id;
        this.permission = permission;
    }
}
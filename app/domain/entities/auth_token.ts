export class AuthToken{
    id: string;
    token: string;

    constructor ({id, token}: {id: string, token: string}) {
        this.id = id;
        this.token = token;
    }
}
export class UserEntity {
    username?: string;
    id?: string;
    email?: string;

    constructor ({username, id, email}: {
        username?: string,
        id?: string,
        email?: string
    }) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
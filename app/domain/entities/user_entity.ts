export class UserEntity {
    username?: string;
    id?: string;
    email?: string;
    permission?: string;

    constructor ({username, id, email, permission}: {
        username?: string,
        id?: string,
        email?: string,
        permission?: string,
    }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.permission = permission;
    }
}
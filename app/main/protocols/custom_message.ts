export class CustomMessage {
    readonly type: string;
    readonly content: Object;

    constructor ({type, content}: {type: string, content: Object}) {
        this.type = type;
        this.content = content;
    }
}
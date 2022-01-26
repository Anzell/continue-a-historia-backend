export class Phrase {
    public sendAt?: Date;
    public senderId?: string;
    public phrase?: string;

    constructor({ sendAt, senderId, phrase }: {
        sendAt?: Date,
        senderId: string,
        phrase: string
    }) {
        this.sendAt = sendAt;
        this.senderId = senderId;
        this.phrase = phrase;
    }
}
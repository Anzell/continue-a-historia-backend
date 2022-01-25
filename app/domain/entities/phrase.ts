export class Phrase {
    public sendAt?: number;
    public senderId?: string;
    public phrase?: string;

    constructor({ sendAt, senderId, phrase }: {
        sendAt?: number,
        senderId: string,
        phrase: string
    }) {
        this.sendAt = sendAt;
        this.senderId = senderId;
        this.phrase = phrase;
    }
}
import { Phrase } from "./phrase";

export class GameRoom {
    public id?: string;
    public name?: string;
    public adminsIds?: Array<string>;
    public playersIds?: Array<string>;
    public history?: Array<Phrase>;
    public createdAt?: number;

    constructor({ id, name, adminsIds, playersIds, history, createdAt }: {
        id?: string,
        name: string,
        adminsIds: Array<string>,
        playersIds?: Array<string>,
        history?: Array<Phrase>,
        createdAt?: number,
    }) {
        this.id = id;
        this.name = name;
        this.adminsIds = adminsIds;
        this.playersIds = playersIds;
        this.history = history;
        this.createdAt = createdAt;
    }
}
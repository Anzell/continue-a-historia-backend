import {v4 as Uuid} from "uuid";

export interface StringHelper{
    generateUuid: () => string;
}

export class StringHelperImpl implements StringHelper {
    constructor(private readonly uuid: typeof Uuid) {}

    generateUuid(): string {
        return this.uuid();
    }

}
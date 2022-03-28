export class ResumeGameRoom {
    readonly id: string;
    readonly title: string;
    readonly playersNumber: number;
    readonly phrasesNumber: number;

    constructor ({id, playersNumber, phrasesNumber, title}: {
        id: string,
        title: string,
        playersNumber: number,
        phrasesNumber: number
    }) {
        this.title = title;
        this.id = id;
        this.phrasesNumber = phrasesNumber;
        this.playersNumber = playersNumber;
    }
}
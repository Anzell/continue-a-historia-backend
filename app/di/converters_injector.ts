import {GameRoomConverter} from "../presenters/room/converters/game_room_converter";

export class ConvertersInjector {
    public static async GameRoomConverterFactory(): Promise<GameRoomConverter> {
        return new GameRoomConverter();
    }
}
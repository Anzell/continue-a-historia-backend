import {GameRoomConverter} from "../presenters/room/converters/game_room_converter";
import {SignupConverter} from "../presenters/auth/converters/signup_converters";
import {PlayerEnterInRoomConverter} from "../presenters/room/converters/player_enter_in_room_converter";

export class ConvertersInjector {
    public static async gameRoomConverterFactory(): Promise<GameRoomConverter> {
        return new GameRoomConverter();
    }

    public static async signUpConverterFactory(): Promise<SignupConverter>{
        return new SignupConverter();
    }

    public static async playerEnterInRoomConverterFactory(): Promise<PlayerEnterInRoomConverter> {
        return new PlayerEnterInRoomConverter();
    }
}
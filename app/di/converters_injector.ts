import {GameRoomConverter} from "../presenters/room/converters/game_room_converter";
import {SignupConverter} from "../presenters/auth/converters/signup_converters";

export class ConvertersInjector {
    public static async gameRoomConverterFactory(): Promise<GameRoomConverter> {
        return new GameRoomConverter();
    }

    public static async signUpConverterFactory(): Promise<SignupConverter>{
        return new SignupConverter();
    }
}
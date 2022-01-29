import {UsecasesInjector} from "./usecases_injector";
import {ConvertersInjector} from "./converters_injector";
import {CreateRoomController} from "../presenters/room/create_room_controller";
import {SignUpController} from "../presenters/auth/signup_controller";

export class ControllersInjectorFactory {
    public static async createRoomControllerFactory(): Promise<CreateRoomController>{
        const usecase = await UsecasesInjector.CreateRoomUsecaseFactory();
        const converter = await ConvertersInjector.gameRoomConverterFactory();
        return new CreateRoomController(usecase, converter);
    }

    public static async signUpControllerFactory(): Promise<SignUpController>{
        const usecase = await UsecasesInjector.signUpUsecaseFactory();
        const converter = await ConvertersInjector.signUpConverterFactory();
        return new SignUpController(usecase, converter);
    }
}
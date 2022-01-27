import {UsecasesInjector} from "./usecases_injector";
import {ConvertersInjector} from "./converters_injector";
import {CreateRoomController} from "../presenters/room/create_room_controller";

export class ControllersInjectorFactory {
    public static async CreateRoomControllerFactory(): Promise<CreateRoomController>{
        const usecase = await UsecasesInjector.CreateRoomUsecaseFactory();
        const converter = await ConvertersInjector.GameRoomConverterFactory();
        return new CreateRoomController(usecase, converter);
    }
}
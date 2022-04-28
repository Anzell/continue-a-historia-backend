import {UsecasesInjector} from "./usecases_injector";
import {ConvertersInjector} from "./converters_injector";
import {CreateRoomController} from "../presenters/room/create_room_controller";
import {SignUpController} from "../presenters/auth/signup_controller";
import {AuthGuardRoute} from "../main/middlewares/auth_guard_route";
import {TokenHelper} from "../core/helper/token_helper";
import {CoreInjector} from "./core_injector";
import {SignInController} from "../presenters/auth/signin_controller";
import {SignInUsecase, SignInUseCaseImpl} from "../domain/usecases/auth/sign_in";
import {RepositoriesInjector} from "./repositories_injector";
import {SignInConverter} from "../presenters/auth/converters/signin_converter";
import {PlayerEnterInRoomController} from "../presenters/room/player_enter_in_room_controller";
import {PlayerEnterInRoomUsecase} from "../domain/usecases/room/player_enter_in_room";
import {PlayerEnterInRoomConverter} from "../presenters/room/converters/player_enter_in_room_converter";
import {AuthGuardSocket} from "../main/middlewares/auth_guard_socket";
import {GetUserPermissionsUsecase} from "../domain/usecases/user/get_user_permissions";
import {PlayerSendPhraseToHistoryController} from "../presenters/room/player_send_phrase_to_history_controller";
import {GetUserByIdController} from "../presenters/user/get_user_by_id_controller";
import {GetPlayerRoomsController} from "../presenters/room/get_player_rooms_controller";
import {GetRoomByIdController} from "../presenters/room/get_room_by_id_controller";
import { GetUserByUsernameConverter } from "../presenters/user/converters/get_user_by_username_converter";
import { GetUserByUsernameUsecase } from "../domain/usecases/user/get_user_by_username";
import {LockRoomController} from "../presenters/room/lock_room_controller";

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

    public static async authGuardRouteFactory(...authorized: string[]): Promise<AuthGuardRoute> {
        const getUserPermissionUsecase: GetUserPermissionsUsecase = await UsecasesInjector.getUserPermissionUsecaseFactory();
        const tokenHelper: TokenHelper = await CoreInjector.tokenHelperFactory();
        return new AuthGuardRoute({authorized, tokenHelper, getUserPermissionUsecase: getUserPermissionUsecase});
    }

    public static async authGuardSocketFactory(...authorized: string[]): Promise<AuthGuardSocket> {
        const getUserPermissionUsecase: GetUserPermissionsUsecase = await UsecasesInjector.getUserPermissionUsecaseFactory();
        const tokenHelper: TokenHelper = await CoreInjector.tokenHelperFactory();
        return new AuthGuardSocket({authorized, tokenHelper, getUserPermissionUsecase: getUserPermissionUsecase});
    }

    public static async signInControllerFactory(): Promise<SignInController> {
        const usecase: SignInUsecase = new SignInUseCaseImpl(await RepositoriesInjector.authRepositoryFactory());
        const converter: SignInConverter = new SignInConverter();
        return new SignInController(usecase, converter);
    }

    public static async playerEnterInRoomControllerFactory(): Promise<PlayerEnterInRoomController> {
        const usecase: PlayerEnterInRoomUsecase = await UsecasesInjector.insertUserInRoomUsecaseFactory();
        const converter: PlayerEnterInRoomConverter = await ConvertersInjector.playerEnterInRoomConverterFactory();
        const getUserByUsernameConverter: GetUserByUsernameConverter = await ConvertersInjector.getUserByUsernameConverterFactory();
        const getUserByUsernameUsecase: GetUserByUsernameUsecase = await UsecasesInjector.getUserByUsernameUsecaseFactory();
        return new PlayerEnterInRoomController(usecase, converter, getUserByUsernameConverter, getUserByUsernameUsecase);
    }

    public static async playerSendPhraseToHistoryControllerFactory(): Promise<PlayerSendPhraseToHistoryController> {
        const getRoomIdUsecase = await UsecasesInjector.getRoomByIdUsecaseFactory();
        const sendPhraseToHistoryUsecase = await UsecasesInjector.playerSendPhraseToHistoryUsecaseFactory();
        const converter = await ConvertersInjector.playerSendPhraseToHistoryConverterFactory();
        return new PlayerSendPhraseToHistoryController(sendPhraseToHistoryUsecase, converter, getRoomIdUsecase);
    }

    public static async getUserByIdControllerFactory(): Promise<GetUserByIdController> {
        const usecase = await UsecasesInjector.getUserByIdUsecaseFactory();
        const converter = await ConvertersInjector.getUserByIdConverterFactory();
        return new GetUserByIdController(usecase, converter);
    }

    public static async getPlayerRoomsControllerFactory(): Promise<GetPlayerRoomsController> {
        const usecase = await UsecasesInjector.getRoomsOfPlayerByIdUsecaseFactory();
        const converter = await ConvertersInjector.getPlayerRoomsConverterFactory();
        return new GetPlayerRoomsController({converter, usecase});
    }

    public static async getRoomByIdControllerFactory(): Promise<GetRoomByIdController> {
        const usecase = await UsecasesInjector.getRoomByIdUsecaseFactory();
        const converter = await ConvertersInjector.getRoomByIdConverterFactory();
        return new GetRoomByIdController({converter, usecase});
    }

    public static async lockRoomControllerFactory(): Promise<LockRoomController> {
        const getRoombyIdUsecase = await UsecasesInjector.getRoomByIdUsecaseFactory();
        const updateRoomUsecase = await UsecasesInjector.updateRoomUsecaseFactory();
        const converter = await ConvertersInjector.lockRoomConverterFactory();
        return new LockRoomController({converter, getRoombyIdUsecase, updateRoomUsecase});
    }
}
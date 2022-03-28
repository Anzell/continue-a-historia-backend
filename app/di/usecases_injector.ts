import {CreateRoomUsecase, CreateRoomUsecaseImpl} from "../domain/usecases/room/create_room";
import {RepositoriesInjector} from "./repositories_injector";
import {SignUpUsecase, SignUpUsecaseImpl} from "../domain/usecases/auth/sign_up";
import {SignInUsecase, SignInUseCaseImpl} from "../domain/usecases/auth/sign_in";
import {GetUserByIdUsecase} from "../domain/usecases/user/get_user_by_id";
import {PlayerEnterInRoomUsecase, PlayerEnterInRoomUsecaseImpl} from "../domain/usecases/room/player_enter_in_room";
import {GetUserPermissionsUsecase} from "../domain/usecases/user/get_user_permissions";
import {
    PlayerSendPhraseToHistoryUsecase,
    PlayerSendPhraseToHistoryUsecaseImpl
} from "../domain/usecases/room/player_send_phrase_to_history";
import {GetRoomByIdUsecase, GetRoomByIdUsecaseImpl} from "../domain/usecases/room/get_room_by_id";
import {GetUserRoomsUsecase, GetUserRoomsUsecaseImpl} from "../domain/usecases/room/get_user_rooms";

export class UsecasesInjector {
    public static async CreateRoomUsecaseFactory(): Promise<CreateRoomUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new CreateRoomUsecaseImpl(repository);
    }

    public static async signUpUsecaseFactory(): Promise<SignUpUsecase> {
        const repository = await RepositoriesInjector.authRepositoryFactory();
        return new SignUpUsecaseImpl(repository);
    }

    public static async signInUsecaseFactory(): Promise<SignInUsecase>{
        const repository = await RepositoriesInjector.authRepositoryFactory();
        return new SignInUseCaseImpl(repository);
    }

    public static async getUserByIdUsecaseFactory(): Promise<GetUserByIdUsecase> {
        const repository = await RepositoriesInjector.userRepositoryFactory();
        return new GetUserByIdUsecase(repository);
    }

    public static async getUserPermissionUsecaseFactory(): Promise<GetUserPermissionsUsecase> {
        const repository = await RepositoriesInjector.userRepositoryFactory();
        return new GetUserPermissionsUsecase(repository);
    }

    public static async insertUserInRoomUsecaseFactory(): Promise<PlayerEnterInRoomUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new PlayerEnterInRoomUsecaseImpl(repository);
    }

    public static async playerSendPhraseToHistoryUsecaseFactory(): Promise<PlayerSendPhraseToHistoryUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new PlayerSendPhraseToHistoryUsecaseImpl(repository);
    }

    public static async getRoomByIdUsecaseFactory(): Promise<GetRoomByIdUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new GetRoomByIdUsecaseImpl(repository);
    }

    public static async getRoomsOfPlayerByIdUsecaseFactory(): Promise<GetUserRoomsUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new GetUserRoomsUsecaseImpl({repository});
    }
}
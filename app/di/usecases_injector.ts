import {CreateRoomUsecase, CreateRoomUsecaseImpl} from "../domain/usecases/room/create_room";
import {RepositoriesInjector} from "./repositories_injector";
import {SignUpUsecase, SignUpUsecaseImpl} from "../domain/usecases/auth/sign_up";
import {SignInUsecase, SignInUseCaseImpl} from "../domain/usecases/auth/sign_in";
import {GetUserByIdUsecase} from "../domain/usecases/user/get_user_by_id";
import {PlayerEnterInRoomUsecase, PlayerEnterInRoomUsecaseImpl} from "../domain/usecases/room/player_enter_in_room";
import {GetUserPermissionsUsecase} from "../domain/usecases/user/get_user_permissions";

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

    public static async getUserByIdUsecase(): Promise<GetUserByIdUsecase> {
        const repository = await RepositoriesInjector.userRepositoryFactory();
        return new GetUserByIdUsecase(repository);
    }

    public static async getUserPermissionUsecase(): Promise<GetUserPermissionsUsecase> {
        const repository = await RepositoriesInjector.userRepositoryFactory();
        return new GetUserPermissionsUsecase(repository);
    }

    public static async insertUserInRoomUsecase(): Promise<PlayerEnterInRoomUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new PlayerEnterInRoomUsecaseImpl(repository);
    }


}
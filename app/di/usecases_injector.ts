import {CreateRoomUsecase, CreateRoomUsecaseImpl} from "../domain/usecases/room/create_room";
import {RepositoriesInjector} from "./repositories_injector";
import {SignUpUsecase, SignUpUsecaseImpl} from "../domain/usecases/auth/sign_up";

export class UsecasesInjector {
    public static async CreateRoomUsecaseFactory(): Promise<CreateRoomUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new CreateRoomUsecaseImpl(repository);
    }

    public static async signUpUsecaseFactory(): Promise<SignUpUsecase> {
        const repository = await RepositoriesInjector.authRepositoryFactory();
        return new SignUpUsecaseImpl(repository);
    }
}
import {CreateRoomUsecase, CreateRoomUsecaseImpl} from "../domain/usecases/room/create_room";
import {RepositoriesInjector} from "./repositories_injector";

export class UsecasesInjector {
    public static async CreateRoomUsecaseFactory(): Promise<CreateRoomUsecase> {
        const repository = await RepositoriesInjector.roomRepositoryFactory();
        return new CreateRoomUsecaseImpl(repository);
    }
}
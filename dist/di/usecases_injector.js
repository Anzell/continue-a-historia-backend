"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecasesInjector = void 0;
const create_room_1 = require("../domain/usecases/room/create_room");
const repositories_injector_1 = require("./repositories_injector");
const sign_up_1 = require("../domain/usecases/auth/sign_up");
const sign_in_1 = require("../domain/usecases/auth/sign_in");
const get_user_by_id_1 = require("../domain/usecases/user/get_user_by_id");
const player_enter_in_room_1 = require("../domain/usecases/room/player_enter_in_room");
const get_user_permissions_1 = require("../domain/usecases/user/get_user_permissions");
const player_send_phrase_to_history_1 = require("../domain/usecases/room/player_send_phrase_to_history");
const get_room_by_id_1 = require("../domain/usecases/room/get_room_by_id");
const get_user_rooms_1 = require("../domain/usecases/room/get_user_rooms");
const get_user_by_username_1 = require("../domain/usecases/user/get_user_by_username");
const update_room_1 = require("../domain/usecases/room/update_room");
class UsecasesInjector {
    static async CreateRoomUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.roomRepositoryFactory();
        return new create_room_1.CreateRoomUsecaseImpl(repository);
    }
    static async signUpUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.authRepositoryFactory();
        return new sign_up_1.SignUpUsecaseImpl(repository);
    }
    static async signInUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.authRepositoryFactory();
        return new sign_in_1.SignInUseCaseImpl(repository);
    }
    static async getUserByIdUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.userRepositoryFactory();
        return new get_user_by_id_1.GetUserByIdUsecase(repository);
    }
    static async getUserPermissionUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.userRepositoryFactory();
        return new get_user_permissions_1.GetUserPermissionsUsecase(repository);
    }
    static async insertUserInRoomUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.roomRepositoryFactory();
        return new player_enter_in_room_1.PlayerEnterInRoomUsecaseImpl(repository);
    }
    static async playerSendPhraseToHistoryUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.roomRepositoryFactory();
        return new player_send_phrase_to_history_1.PlayerSendPhraseToHistoryUsecaseImpl(repository);
    }
    static async getRoomByIdUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.roomRepositoryFactory();
        return new get_room_by_id_1.GetRoomByIdUsecaseImpl(repository);
    }
    static async getRoomsOfPlayerByIdUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.roomRepositoryFactory();
        return new get_user_rooms_1.GetUserRoomsUsecaseImpl({ repository });
    }
    static async getUserByUsernameUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.userRepositoryFactory();
        return new get_user_by_username_1.GetUserByUsernameUsecase(repository);
    }
    static async updateRoomUsecaseFactory() {
        const repository = await repositories_injector_1.RepositoriesInjector.roomRepositoryFactory();
        return new update_room_1.UpdateRoomUseCaseImpl(repository);
    }
}
exports.UsecasesInjector = UsecasesInjector;

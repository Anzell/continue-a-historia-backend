"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersInjectorFactory = void 0;
const usecases_injector_1 = require("./usecases_injector");
const converters_injector_1 = require("./converters_injector");
const create_room_controller_1 = require("../presenters/room/create_room_controller");
const signup_controller_1 = require("../presenters/auth/signup_controller");
const auth_guard_route_1 = require("../main/middlewares/auth_guard_route");
const core_injector_1 = require("./core_injector");
const signin_controller_1 = require("../presenters/auth/signin_controller");
const sign_in_1 = require("../domain/usecases/auth/sign_in");
const repositories_injector_1 = require("./repositories_injector");
const signin_converter_1 = require("../presenters/auth/converters/signin_converter");
const player_enter_in_room_controller_1 = require("../presenters/room/player_enter_in_room_controller");
const auth_guard_socket_1 = require("../main/middlewares/auth_guard_socket");
const player_send_phrase_to_history_controller_1 = require("../presenters/room/player_send_phrase_to_history_controller");
const get_user_by_id_controller_1 = require("../presenters/user/get_user_by_id_controller");
const get_player_rooms_controller_1 = require("../presenters/room/get_player_rooms_controller");
const get_room_by_id_controller_1 = require("../presenters/room/get_room_by_id_controller");
class ControllersInjectorFactory {
    static async createRoomControllerFactory() {
        const usecase = await usecases_injector_1.UsecasesInjector.CreateRoomUsecaseFactory();
        const converter = await converters_injector_1.ConvertersInjector.gameRoomConverterFactory();
        return new create_room_controller_1.CreateRoomController(usecase, converter);
    }
    static async signUpControllerFactory() {
        const usecase = await usecases_injector_1.UsecasesInjector.signUpUsecaseFactory();
        const converter = await converters_injector_1.ConvertersInjector.signUpConverterFactory();
        return new signup_controller_1.SignUpController(usecase, converter);
    }
    static async authGuardRouteFactory(...authorized) {
        const getUserPermissionUsecase = await usecases_injector_1.UsecasesInjector.getUserPermissionUsecaseFactory();
        const tokenHelper = await core_injector_1.CoreInjector.tokenHelperFactory();
        return new auth_guard_route_1.AuthGuardRoute({ authorized, tokenHelper, getUserPermissionUsecase: getUserPermissionUsecase });
    }
    static async authGuardSocketFactory(...authorized) {
        const getUserPermissionUsecase = await usecases_injector_1.UsecasesInjector.getUserPermissionUsecaseFactory();
        const tokenHelper = await core_injector_1.CoreInjector.tokenHelperFactory();
        return new auth_guard_socket_1.AuthGuardSocket({ authorized, tokenHelper, getUserPermissionUsecase: getUserPermissionUsecase });
    }
    static async signInControllerFactory() {
        const usecase = new sign_in_1.SignInUseCaseImpl(await repositories_injector_1.RepositoriesInjector.authRepositoryFactory());
        const converter = new signin_converter_1.SignInConverter();
        return new signin_controller_1.SignInController(usecase, converter);
    }
    static async playerEnterInRoomControllerFactory() {
        const usecase = await usecases_injector_1.UsecasesInjector.insertUserInRoomUsecaseFactory();
        const converter = await converters_injector_1.ConvertersInjector.playerEnterInRoomConverterFactory();
        const getUserByUsernameConverter = await converters_injector_1.ConvertersInjector.getUserByUsernameConverterFactory();
        const getUserByUsernameUsecase = await usecases_injector_1.UsecasesInjector.getUserByUsernameUsecaseFactory();
        return new player_enter_in_room_controller_1.PlayerEnterInRoomController(usecase, converter, getUserByUsernameConverter, getUserByUsernameUsecase);
    }
    static async playerSendPhraseToHistoryControllerFactory() {
        const getRoomIdUsecase = await usecases_injector_1.UsecasesInjector.getRoomByIdUsecaseFactory();
        const sendPhraseToHistoryUsecase = await usecases_injector_1.UsecasesInjector.playerSendPhraseToHistoryUsecaseFactory();
        const converter = await converters_injector_1.ConvertersInjector.playerSendPhraseToHistoryConverterFactory();
        return new player_send_phrase_to_history_controller_1.PlayerSendPhraseToHistoryController(sendPhraseToHistoryUsecase, converter, getRoomIdUsecase);
    }
    static async getUserByIdControllerFactory() {
        const usecase = await usecases_injector_1.UsecasesInjector.getUserByIdUsecaseFactory();
        const converter = await converters_injector_1.ConvertersInjector.getUserByIdConverterFactory();
        return new get_user_by_id_controller_1.GetUserByIdController(usecase, converter);
    }
    static async getPlayerRoomsControllerFactory() {
        const usecase = await usecases_injector_1.UsecasesInjector.getRoomsOfPlayerByIdUsecaseFactory();
        const converter = await converters_injector_1.ConvertersInjector.getPlayerRoomsConverterFactory();
        return new get_player_rooms_controller_1.GetPlayerRoomsController({ converter, usecase });
    }
    static async getRoomByIdControllerFactory() {
        const usecase = await usecases_injector_1.UsecasesInjector.getRoomByIdUsecaseFactory();
        const converter = await converters_injector_1.ConvertersInjector.getRoomByIdConverterFactory();
        return new get_room_by_id_controller_1.GetRoomByIdController({ converter, usecase });
    }
}
exports.ControllersInjectorFactory = ControllersInjectorFactory;

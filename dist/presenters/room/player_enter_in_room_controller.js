"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEnterInRoomController = void 0;
const player_enter_in_room_1 = require("../../domain/usecases/room/player_enter_in_room");
const player_enter_in_room_converter_1 = require("./converters/player_enter_in_room_converter");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const code_helper_1 = require("../../core/helper/code_helper");
const get_user_by_username_converter_1 = require("../user/converters/get_user_by_username_converter");
const get_user_by_username_1 = require("../../domain/usecases/user/get_user_by_username");
class PlayerEnterInRoomController {
    constructor(insertPlayerInRoomUsecase, insertPlayerConverter, getUserByUsernameConverter, getUserByUsernameUsecase) {
        this.insertPlayerInRoomUsecase = insertPlayerInRoomUsecase;
        this.insertPlayerConverter = insertPlayerConverter;
        this.getUserByUsernameConverter = getUserByUsernameConverter;
        this.getUserByUsernameUsecase = getUserByUsernameUsecase;
    }
    async handle(request) {
        return await new Promise((resolve) => {
            const getUserByUsernameConverterResult = this.getUserByUsernameConverter.handle(new get_user_by_username_converter_1.GetUserByUsernameConverterParams({ username: request["username"] }));
            getUserByUsernameConverterResult.map(async (convertedUsername) => {
                const getUserByUsermeUsecaseResult = await this.getUserByUsernameUsecase.handle(new get_user_by_username_1.GetUserByUsernameUsecaseParams({ username: convertedUsername.username }));
                getUserByUsermeUsecaseResult.map(async (user) => {
                    const playerEnterRoomConverter = this.insertPlayerConverter.handle(new player_enter_in_room_converter_1.PlayerEnterInRoomConverterParams({
                        userId: user.id,
                        roomId: request['roomId'],
                    }));
                    playerEnterRoomConverter.map(async (data) => {
                        const result = await this.insertPlayerInRoomUsecase.handle(new player_enter_in_room_1.PlayerEnterInRoomUsecaseParams({
                            roomId: data.roomId,
                            userId: data.userId,
                        }));
                        result.map((_) => {
                            resolve(new custom_response_1.CustomResponse({
                                codeStatus: 200,
                                code: server_codes_1.ServerCodes.success,
                                message: success_messages_1.SuccessMessages.operationSuccess,
                                result: {}
                            }));
                        });
                        result.leftMap((failure) => {
                            resolve(new custom_response_1.CustomResponse({
                                message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                                code: code_helper_1.CodeHelper.failureToCode(failure),
                                codeStatus: 400,
                                result: {}
                            }));
                        });
                    });
                    playerEnterRoomConverter.leftMap((failure) => {
                        resolve(new custom_response_1.CustomResponse({
                            codeStatus: 400,
                            code: code_helper_1.CodeHelper.failureToCode(failure),
                            message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                            result: {},
                        }));
                    });
                });
                getUserByUsermeUsecaseResult.leftMap((failure) => {
                    resolve(new custom_response_1.CustomResponse({
                        codeStatus: 400,
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                        result: {},
                    }));
                });
            });
            getUserByUsernameConverterResult.leftMap((failure) => {
                resolve(new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                    result: {},
                }));
            });
        });
    }
}
exports.PlayerEnterInRoomController = PlayerEnterInRoomController;

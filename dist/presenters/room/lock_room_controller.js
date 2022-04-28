"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockRoomController = void 0;
const get_room_by_id_1 = require("../../domain/usecases/room/get_room_by_id");
const update_room_1 = require("../../domain/usecases/room/update_room");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const game_room_1 = require("../../domain/entities/game_room");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const code_helper_1 = require("../../core/helper/code_helper");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class LockRoomController {
    constructor({ converter, getRoombyIdUsecase, updateRoomUsecase }) {
        this.converter = converter;
        this.updateRoomUsecase = updateRoomUsecase;
        this.getRoombyIdUsecase = getRoombyIdUsecase;
    }
    async handle(request) {
        return await new Promise(async (resolve) => {
            const converterResult = await this.converter.handle(request);
            converterResult.map(async (convertedRequest) => {
                const getRoomByIdResult = await this.getRoombyIdUsecase.handle(new get_room_by_id_1.GetRoomByIdUsecaseParams({ id: convertedRequest.roomId }));
                getRoomByIdResult.map(async (roomData) => {
                    const updateData = new game_room_1.GameRoom({
                        id: roomData.id,
                        name: roomData.name,
                        adminsIds: roomData.adminsIds,
                        playersIds: roomData.playersIds,
                        history: roomData.history,
                        createdAt: roomData.createdAt,
                        someoneIsTapping: convertedRequest.lock,
                        lastTappedId: convertedRequest.userId,
                    });
                    const resultUpdateRoomUsecase = await this.updateRoomUsecase.handle(new update_room_1.UpdateRoomUseCaseParams({ room: updateData }));
                    resultUpdateRoomUsecase.map((_) => {
                        resolve(new custom_response_1.CustomResponse({
                            code: server_codes_1.ServerCodes.success,
                            codeStatus: 200,
                            message: success_messages_1.SuccessMessages.operationSuccess,
                            result: {}
                        }));
                    });
                    resultUpdateRoomUsecase.leftMap((failure) => {
                        resolve(new custom_response_1.CustomResponse({
                            code: code_helper_1.CodeHelper.failureToCode(failure),
                            codeStatus: 400,
                            result: {},
                            message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                        }));
                    });
                });
                getRoomByIdResult.leftMap((failure) => {
                    resolve(new custom_response_1.CustomResponse({
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        result: {},
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                    }));
                });
            });
            converterResult.leftMap((failure) => {
                resolve(new custom_response_1.CustomResponse({
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    codeStatus: 400,
                    result: {},
                    message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                }));
            });
        });
    }
}
exports.LockRoomController = LockRoomController;

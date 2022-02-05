"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEnterInRoomController = void 0;
const player_enter_in_room_1 = require("../../domain/usecases/room/player_enter_in_room");
const player_enter_in_room_converter_1 = require("./converters/player_enter_in_room_converter");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const custom_message_1 = require("../../main/protocols/custom_message");
const type_messages_1 = require("../../core/constants/socket/type_messages");
class PlayerEnterInRoomController {
    constructor(insertPlayerInRoomUsecase, insertPlayerConverter) {
        this.insertPlayerInRoomUsecase = insertPlayerInRoomUsecase;
        this.insertPlayerConverter = insertPlayerConverter;
    }
    async handle(request) {
        let serverResponse = new custom_message_1.CustomMessage({
            type: type_messages_1.TypeSocketMessages.error,
            content: {}
        });
        await new Promise((resolve) => {
            const converter = this.insertPlayerConverter.handle(new player_enter_in_room_converter_1.PlayerEnterInRoomConverterParams({
                userId: request['userId'],
                roomId: request['roomId'],
            }));
            converter.map(async (data) => {
                const result = await this.insertPlayerInRoomUsecase.handle(new player_enter_in_room_1.PlayerEnterInRoomUsecaseParams({
                    roomId: data.roomId,
                    userId: data.userId,
                }));
                result.map((_) => {
                    serverResponse = new custom_message_1.CustomMessage({
                        type: type_messages_1.TypeSocketMessages.playerEnterInRoom,
                        content: {}
                    });
                    resolve(true);
                });
                result.leftMap((failure) => {
                    serverResponse = new custom_message_1.CustomMessage({
                        type: type_messages_1.TypeSocketMessages.error,
                        content: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new custom_message_1.CustomMessage({
                    type: type_messages_1.TypeSocketMessages.error,
                    content: failure.message,
                });
                resolve(false);
            });
        });
        return serverResponse;
    }
}
exports.PlayerEnterInRoomController = PlayerEnterInRoomController;

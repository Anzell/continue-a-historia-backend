"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const game_room_converter_1 = require("./converters/game_room_converter");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const success_messages_1 = require("../../core/constants/messages/success_messages");
class CreateRoomController {
    constructor(createRoomUsecase, gameRoomConverter) {
        this.createRoomUsecase = createRoomUsecase;
        this.gameRoomConverter = gameRoomConverter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            result: {},
            message: "Erro no servidor",
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.gameRoomConverter.handle(new game_room_converter_1.GameRoomConverterParams({
                name: request['name'],
                adminsIds: request['adminsIds'],
                playersIds: request['playersIds']
            }));
            converter.map(async (room) => {
                const result = await this.createRoomUsecase.handle({ room });
                result.map((_) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 200,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        result: {}
                    });
                    resolve(true);
                });
                result.leftMap((failure) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 400,
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                        result: {}
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    message: failure.message,
                    result: {}
                });
                resolve(false);
            });
        });
        return serverResponse;
    }
}
exports.CreateRoomController = CreateRoomController;

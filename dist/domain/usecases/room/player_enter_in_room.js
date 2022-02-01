"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEnterInRoomUsecaseParams = exports.PlayerEnterInRoomUsecaseImpl = exports.PlayerEnterInRoomUsecase = void 0;
class PlayerEnterInRoomUsecase {
}
exports.PlayerEnterInRoomUsecase = PlayerEnterInRoomUsecase;
class PlayerEnterInRoomUsecaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.insertPlayer({ userId: params.userId, roomId: params.roomId });
    }
}
exports.PlayerEnterInRoomUsecaseImpl = PlayerEnterInRoomUsecaseImpl;
class PlayerEnterInRoomUsecaseParams {
    constructor({ roomId, userId }) {
        this.roomId = roomId;
        this.userId = userId;
    }
}
exports.PlayerEnterInRoomUsecaseParams = PlayerEnterInRoomUsecaseParams;

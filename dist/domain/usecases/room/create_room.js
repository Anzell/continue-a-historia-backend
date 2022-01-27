"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomUsecaseParams = exports.CreateRoomUsecaseImpl = exports.CreateRoomUsecase = void 0;
class CreateRoomUsecase {
}
exports.CreateRoomUsecase = CreateRoomUsecase;
class CreateRoomUsecaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.createRoom(params.room);
    }
}
exports.CreateRoomUsecaseImpl = CreateRoomUsecaseImpl;
class CreateRoomUsecaseParams {
    constructor({ room }) {
        this.room = room;
    }
}
exports.CreateRoomUsecaseParams = CreateRoomUsecaseParams;

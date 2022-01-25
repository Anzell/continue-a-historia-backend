"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomUsecaseParams = exports.CreateRoomUsecase = void 0;
class CreateRoomUsecase {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.createRoom(params.room);
    }
}
exports.CreateRoomUsecase = CreateRoomUsecase;
class CreateRoomUsecaseParams {
    constructor({ room }) {
        this.room = room;
    }
}
exports.CreateRoomUsecaseParams = CreateRoomUsecaseParams;

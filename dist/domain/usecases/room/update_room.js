"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoomUseCaseParams = exports.UpdateRoomUseCaseImpl = exports.UpdateRoomUseCase = void 0;
class UpdateRoomUseCase {
}
exports.UpdateRoomUseCase = UpdateRoomUseCase;
class UpdateRoomUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.updateRoom({ roomData: params.room });
    }
}
exports.UpdateRoomUseCaseImpl = UpdateRoomUseCaseImpl;
class UpdateRoomUseCaseParams {
    constructor({ room }) {
        this.room = room;
    }
}
exports.UpdateRoomUseCaseParams = UpdateRoomUseCaseParams;

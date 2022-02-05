"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomByIdUsecaseParams = exports.GetRoomByIdUsecaseImpl = exports.GetRoomByIdUsecase = void 0;
class GetRoomByIdUsecase {
}
exports.GetRoomByIdUsecase = GetRoomByIdUsecase;
class GetRoomByIdUsecaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.getRoomById({ id: params.id });
    }
}
exports.GetRoomByIdUsecaseImpl = GetRoomByIdUsecaseImpl;
class GetRoomByIdUsecaseParams {
    constructor({ id }) {
        this.id = id;
    }
}
exports.GetRoomByIdUsecaseParams = GetRoomByIdUsecaseParams;

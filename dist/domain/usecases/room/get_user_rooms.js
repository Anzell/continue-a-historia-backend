"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserRoomsUsecaseParams = exports.GetUserRoomsUsecaseImpl = exports.GetUserRoomsUsecase = void 0;
class GetUserRoomsUsecase {
}
exports.GetUserRoomsUsecase = GetUserRoomsUsecase;
class GetUserRoomsUsecaseImpl {
    constructor({ repository }) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.getPlayerRooms({ userId: params.userId });
    }
}
exports.GetUserRoomsUsecaseImpl = GetUserRoomsUsecaseImpl;
class GetUserRoomsUsecaseParams {
    constructor({ userId }) {
        this.userId = userId;
    }
}
exports.GetUserRoomsUsecaseParams = GetUserRoomsUsecaseParams;

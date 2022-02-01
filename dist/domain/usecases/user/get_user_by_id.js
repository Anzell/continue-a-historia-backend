"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdUsecaseParams = exports.GetUserByIdUsecase = void 0;
class GetUserByIdUsecase {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.getUserById({ id: params.id });
    }
}
exports.GetUserByIdUsecase = GetUserByIdUsecase;
class GetUserByIdUsecaseParams {
    constructor({ id }) {
        this.id = id;
    }
}
exports.GetUserByIdUsecaseParams = GetUserByIdUsecaseParams;
